import {
  Card,
  LoadingOverlay,
  Stack,
  Group,
  Title,
  PinInput,
  Container,
  Transition,
} from '@mantine/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { showNotification } from '@mantine/notifications';
import { PATH_IMAGE } from '../../../../lib/image-paths';
import classes from '../maintainer-upload-file-section.module.css';
import axiosInstance, { AxiosResDataGeneric } from '../../../../utils/axios-instance';
import { Icons } from '../../../../data/icons/icons';
import { useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { sleep } from '../../../../utils/helpers/helper-functions';
import { MaintenanceModel } from '../../../../types/models/maintenance-check-type';
import { PATH_API, _PATH_API } from '../../../../path/path-api';
import { MaintainerCompleteRegisterCard } from '../maintainer-complete-register/MaintainerCompleteRegisterCard';

/**
 * @description Send pin code after verified get maintenance and set maintenance in redux store
 */
export const PinVerifCardMCheck = ({ setPinOk }: { setPinOk: (bool: boolean) => void }) => {
  const { query, push } = useRouter();
  const [isCompleteRegister, setIsCompleteRegister] = useState<boolean>(false);
  const { setCrudDocument } = useCrudSliceStore();
  const endpoint =
    query.linkId && query.id ? `${PATH_API.maintenanceFileUpload}/${query.linkId}/${query.id}` : '';
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { linkId, id } = query;
  const handleChange = (value: string) => {
    if (value.length === 6) {
      setSubmitting(true);
      handleSubmit(value);
    }
  };

  const handleSubmit = useCallback(
    async (value: string) => {
      try {
        if (typeof linkId !== 'string' || typeof id !== 'string') return;
        const rawMaintainerCheck = await axiosInstance.post(
          _PATH_API.authTokens.checkMaintainerFromMaintenance({ linkId, authTokenId: id }),
          { pin: value }
        );
        if (rawMaintainerCheck.data.success === false && rawMaintainerCheck.data.data) {
          setIsCompleteRegister(true);
          setCrudDocument({ entity: 'maintainers', document: rawMaintainerCheck.data.data });
          return;
        }
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
  useEffect(() => {
    if (!endpoint) return;
    axiosInstance.get(endpoint).then((res) => {
      console.log(res.data.data);
    });
  }, [endpoint]);
  return (
    <Container className={classes.container}>
      {!isCompleteRegister && (
        <Card className={classes.card}>
          <LoadingOverlay visible={submitting} />
          <Stack>
            <Group justify="center">
              <Image src={PATH_IMAGE.unlock} width={120} height={120} alt="unlock image" />
            </Group>
            <Stack justify="center" mt={24}>
              <Title className={classes.heading}>Enter the pin code</Title>
              <Group justify="center">
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
      )}

      {isCompleteRegister && (
        <MaintainerCompleteRegisterCard isCompleteRegister={isCompleteRegister} />
      )}
    </Container>
  );
};
