import { Card, LoadingOverlay, Stack, Group, Title, PinInput } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { PATH_IMAGE } from '../../../lib/image-paths';
import classes from '../maintainer-upload-file-section.module.css';
import { useRouter } from 'next/router';
import { PATH_API } from '../../../path/api-routes';
import axiosInstance, { AxiosResDataGeneric } from '../../../utils/axios-instance';
import useSWR from 'swr';
import Image from 'next/image';
import { showNotification } from '@mantine/notifications';
import { Icons } from '../../../data/icons/icons';
import { ApiError } from 'next/dist/server/api-utils';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { sleep } from '../../../utils/helpers/helper-functions';
import { MaintenanceModel } from '../../../types/models/maintenance-model';

/**
 * @description Send pin code after verified get maintenance and set maintenance in redux store
 */
export const PinVerifCardMCheck = ({
  setPinOk,
  endpoint,
}: {
  setPinOk: (bool: boolean) => void;
  endpoint: string;
}) => {
  const { query, push } = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { setCrudDocument } = useCrudSliceStore();

  const handleChange = (value: string) => {
    if (value.length === 6) {
      setSubmitting(true);
      handleSubmit(value);
    }
  };
  const handleSubmit = useCallback(
    async (value: string) => {
      try {
        const rawRes = await axiosInstance.post<
          AxiosResDataGeneric<{ maintenance: MaintenanceModel }>
        >(endpoint, { pin: value });
        setCrudDocument({ entity: 'maintenances', document: rawRes.data.data.maintenance });
        await sleep(1000);
        setPinOk(true);
      } catch (error: any) {
        showNotification({
          icon: <Icons.alert />,
          title: 'Error',
          message: error.message || error,
          color: 'red',
        });
      } finally {
        setSubmitting(false);
      }
    },
    [endpoint]
  );
  return (
    <Card className={classes.card}>
      <LoadingOverlay visible={submitting} />
      <Stack>
        <Group position="center">
          <Image src={PATH_IMAGE.unlock} width={120} height={120} alt="unlock image" />
        </Group>
        <Stack justify="center" mt={24}>
          <Title className={classes.heading}>Enter the pin code</Title>
          <Group position="center">
            <PinInput
              disabled={submitting}
              size="sm"
              length={6}
              type="number"
              onChange={handleChange}
            />
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};
