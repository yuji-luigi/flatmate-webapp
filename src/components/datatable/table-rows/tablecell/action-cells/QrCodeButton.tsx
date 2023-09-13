import { ActionIcon, Box, Button, Card, Group, Stack } from '@mantine/core';
import { IconQrcode } from '@tabler/icons-react';
import React, { useState } from 'react';
import {
  AuthTokenModel,
  HiddenAuthTokenInterface,
} from '../../../../../types/models/auth-token-model';
import { use_ModalContext } from '../../../../../context/modal-context/_ModalContext';
import QRCode from 'react-qr-code';
import { API_BASE_URL, PATH_API } from '../../../../../path/path-api';
import { _PATH_API } from '../../../../../path/path-api';
import { getEntityFromUrl } from '../../../../../utils/helpers/helper-functions';
import axiosInstance, { AxiosResDataGeneric } from '../../../../../utils/axios-instance';
import { _PATH_FRONTEND } from '../../../../../path/path-frontend';
import { QrCodeModalContent } from './QrCodeModalContent';
import { MongooseBaseModel } from '../../../../../types/models/mongoose-base-model';
const getQrCodeUrl = (authToken: AuthTokenModel) => {
  return `${API_BASE_URL}/${authToken._id}`;
};

const showQrCode = () => ['users'].includes(getEntityFromUrl());

export const QrCodeButton = ({ rowData }: { rowData: MongooseBaseModel }) => {
  const { openConfirmModal } = use_ModalContext();
  const { _id } = rowData;

  const generateQrCode = async () => {
    const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
      _PATH_API.users.getAuthToken(_id)
    );
    const payload = rawAuthToken.data.data;

    openConfirmModal({
      title: 'QR Code',
      type: 'custom',
      children: <QrCodeModalContent authToken={payload} rowData={rowData} />,
      onConfirm: () => {},
    });
  };
  if (!showQrCode()) {
    return null;
  }
  return (
    <ActionIcon color="white" onClick={generateQrCode}>
      <IconQrcode />
    </ActionIcon>
  );
};
