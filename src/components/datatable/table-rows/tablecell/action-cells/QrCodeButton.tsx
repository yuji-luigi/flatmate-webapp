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
import { QrCodeModalContent } from './QrCodeModalContent';
const getQrCodeUrl = (authToken: AuthTokenModel) => {
  return `${API_BASE_URL}/${authToken._id}`;
};

export const QrCodeButton = ({ rowData }: { rowData: any }) => {
  const { openConfirmModal } = use_ModalContext();
  const { authToken: authTokenId }: { authToken: string } = rowData;

  const generateQrCode = async () => {
    const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
      _PATH_API.authTokens.getById(authTokenId)
    );
    const payload = rawAuthToken.data.data;

    openConfirmModal({
      title: 'QR Code',
      type: 'custom',
      children: <QrCodeModalContent authToken={payload} rowData={rowData} />,
      onConfirm: () => {},
    });
  };
  if (!rowData.authToken) {
    return null;
  }
  return (
    <ActionIcon color="white" onClick={generateQrCode}>
      <IconQrcode />
    </ActionIcon>
  );
};
