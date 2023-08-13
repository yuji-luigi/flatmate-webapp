import { ActionIcon, Card } from '@mantine/core';
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
  const generateQrCode = async () => {
    console.log(_PATH_API.authTokens.getById(authToken));
    const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
      _PATH_API.authTokens.getById(authToken)
    );
    const payload = rawAuthToken.data.data;
    openConfirmModal({
      title: 'QR Code',
      type: 'custom',
      children: (
        <Card sx={{ background: 'white' }}>
          {_PATH_CLIENT.authTokens.qrCode({ entity: 'users', authToken: payload })}
          <QRCode value={_PATH_CLIENT.authTokens.qrCode({ entity: 'users', authToken: payload })} />
        </Card>
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
