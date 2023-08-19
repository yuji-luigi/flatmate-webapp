import { ActionIcon, Box, Button, Card, Group, Stack } from '@mantine/core';
import { IconQrcode } from '@tabler/icons-react';
import React, { useState } from 'react';
import {
  AuthTokenModel,
  HiddenAuthTokenInterface,
} from '../../../../../types/models/auth-token-model';
import { use_ModalContext } from '../../../../../context/modal-context/_ModalContext';
import QRCode from 'react-qr-code';
import { API_BASE_URL, PATH_API } from '../../../../../path/api-routes';
import { _PATH_API } from '../../../../../path/api-routes';
import { getEntityFromUrl } from '../../../../../utils/helpers/helper-functions';
import axiosInstance, { AxiosResDataGeneric } from '../../../../../utils/axios-instance';
import { _PATH_CLIENT } from '../../../../../path/page-paths';
const getQrCodeUrl = (authToken: AuthTokenModel) => {
  return `${API_BASE_URL}/${authToken._id}`;
};

export const QrCodeButton = ({ rowData }: { rowData: any }) => {
  const { openConfirmModal } = use_ModalContext();
  const { authToken: authTokenId }: { authToken: string } = rowData;
  const _entity = getEntityFromUrl();
  const [authToken, setAuthToken] = useState<null | HiddenAuthTokenInterface>(null);

  const sendEmailToUser = async () => {
    try {
      const rawResult = await axiosInstance.get(
        _PATH_API.users.sendTokenEmail({ id: rowData._id })
      );
      console.log(rawResult);
    } catch (error) {}
  };
  const generateQrCode = async () => {
    const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
      _PATH_API.authTokens.getById(authTokenId)
    );
    const payload = rawAuthToken.data.data;
    setAuthToken(payload);
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
