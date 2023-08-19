import { ActionIcon, Box, Button, Card, Group, Stack } from '@mantine/core';
import { IconQrcode } from '@tabler/icons-react';
import React from 'react';
import {
  AuthTokenModel,
  HiddenAuthTokenInterface,
} from '../../../../../types/models/auth-token-model';
import { use_ModalContext } from '../../../../../context/modal-context/_ModalContext';
import QRCode from 'react-qr-code';
import { API_BASE_URL } from '../../../../../path/api-routes';
import { _PATH_API } from '../../../../../path/api-routes';
import { getEntityFromUrl } from '../../../../../utils/helpers/helper-functions';
import axiosInstance, { AxiosResDataGeneric } from '../../../../../utils/axios-instance';
import { _PATH_CLIENT } from '../../../../../path/page-paths';
const getQrCodeUrl = (authToken: AuthTokenModel) => {
  return `${API_BASE_URL}/${authToken._id}`;
};

export const QrCodeButton = ({ authToken }: { authToken: string }) => {
  const { openConfirmModal } = use_ModalContext();
  const _entity = getEntityFromUrl();
  const sendEmailToUser = async () => {
    console.log('send email to user');
  };
  const generateQrCode = async () => {
    const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
      _PATH_API.authTokens.getById(authToken)
    );
    const payload = rawAuthToken.data.data;
    openConfirmModal({
      title: 'QR Code',
      type: 'custom',
      children: (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ background: 'white', display: 'flex', justifyContent: 'center' }}>
              <QRCode
                style={{ padding: '10px' }}
                value={_PATH_CLIENT.authTokens.qrCode({ entity: 'users', authToken: payload })}
              />
            </Box>
          </Box>
          <Stack spacing={16} px={80} mt={24}>
            <Button onClick={sendEmailToUser}>Send Email</Button>
            <Button variant="outline">Back</Button>
          </Stack>
        </>
      ),
      onConfirm: () => {},
    });
  };
  return (
    <ActionIcon color="white" onClick={generateQrCode}>
      <IconQrcode />
    </ActionIcon>
  );
};
