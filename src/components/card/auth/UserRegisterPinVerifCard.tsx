import { Card, LoadingOverlay, Stack, Group, Title, PinInput } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { PATH_IMAGE } from '../../../lib/image-paths';
import classes from './PinVerifCard.module.css';
import { useRouter } from 'next/router';
import { _PATH_API } from '../../../path/path-api';
import axiosInstance, { AxiosResDataGeneric } from '../../../utils/axios-instance';
import useSWR from 'swr';
import Image from 'next/image';
import { showNotification } from '@mantine/notifications';
import { Icons } from '../../../data/icons/icons';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { ParsedQueryCustom } from '../../../types/nextjs-custom-types/useRouter-types';

export interface PinVerifCardProps {
  setPinOk: (bool: boolean) => void;
}
/**
 * @description Send pin code get boolean from server
 */
export const UserRegisterPinVerifCard = ({ setPinOk }: PinVerifCardProps) => {
  const { query }: { query: ParsedQueryCustom } = useRouter();
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
        const rawRes = await axiosInstance.post<AxiosResDataGeneric<boolean>>(
          _PATH_API.authTokens.verifyPin({
            _id: query.id || '',
            linkId: query.linkId,
            entity: 'users',
          }),
          { pin: value, entity: 'users' }
        );
        //
        setPinOk(true);
        setCrudDocument({ entity: 'users', document: rawRes.data.data });
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
    [query.linkId]
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
