import { Box, Stack, Button, Text, LoadingOverlay } from '@mantine/core';
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { _PATH_FRONTEND } from '../../../../../path/path-frontend';
import { HiddenAuthTokenInterface } from '../../../../../types/models/auth-token-model';
import { _PATH_API } from '../../../../../path/path-api';
import axiosInstance from '../../../../../utils/axios-instance';
import { Sections } from '../../../../../types/general/data/sections-type';
import { MongooseBaseModel } from '../../../../../types/models/mongoose-base-model';
import { hideNotification, showNotification } from '@mantine/notifications';
import {
  NOTIFICATIONS,
  constructErrorNotificationData,
} from '../../../../../data/showNofification/notificationObjects';
import { QrCodeView } from '../../../../qr-code/QrCodeView';
import { useCustomModalContext } from '../../../../../context/modal-context/_ModalContext';
import { getEntityFromUrl, sleep } from '../../../../../utils/helpers/helper-functions';

export const QrCodeModalContent = ({
  authToken,
  rowData,
}: {
  authToken: HiddenAuthTokenInterface;
  rowData: MongooseBaseModel;
}) => {
  const { closeModal } = useCustomModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const _entity = getEntityFromUrl();
  const sendEmailToUser = async () => {
    try {
      if (_entity === 'users') {
        setIsLoading(true);
        showNotification(NOTIFICATIONS.LOADING.email);
        const rawResult = await axiosInstance.get(
          _PATH_API[_entity].sendTokenEmail({ _id: rowData._id })
        );
        await sleep(700);
        setIsLoading(false);
        hideNotification(NOTIFICATIONS.LOADING.email.id);
        showNotification(NOTIFICATIONS.SUCCESS.email);
        closeModal();
      }
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      await sleep(700);
      showNotification(NOTIFICATIONS.ERROR.general({ data: error.message || error }));
    }
  };
  let qrCodeView = <Text>Qrcode is not available</Text>;
  let sendText = 'send new QR-code to user';

  if (authToken?.active) {
    qrCodeView = <QrCodeView authToken={authToken} />;
    sendText = 'Send QR-code mail';
  }

  return (
    <>
      {qrCodeView}
      <Stack spacing={16} px={80} mt={24}>
        <Button onClick={sendEmailToUser}>{sendText}</Button>
        <Button variant="outline">Back</Button>
        <LoadingOverlay visible={isLoading} />
      </Stack>
    </>
  );
};
