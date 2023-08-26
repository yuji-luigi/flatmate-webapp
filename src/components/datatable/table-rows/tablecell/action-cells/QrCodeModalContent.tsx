import { Box, Stack, Button, Text } from '@mantine/core';
import React from 'react';
import QRCode from 'react-qr-code';
import { _PATH_CLIENT } from '../../../../../path/page-paths';
import { HiddenAuthTokenInterface } from '../../../../../types/models/auth-token-model';
import { _PATH_API } from '../../../../../path/api-routes';
import axiosInstance from '../../../../../utils/axios-instance';
import { Sections } from '../../../../../types/general/data/sections-type';
import { MongooseBaseModel } from '../../../../../types/models/mongoose-base-model';
import { showNotification } from '@mantine/notifications';
import { constructErrorNotificationData } from '../../../../../data/showNofification/notificationObjects';
import { QrCodeView } from '../../../../qr-code/QrCodeView';

export const QrCodeModalContent = ({
  authToken,
  rowData,
}: {
  authToken: HiddenAuthTokenInterface;
  rowData: MongooseBaseModel;
}) => {
  const sendEmailToUser = async () => {
    try {
      if (rowData.__entity === 'users') {
        const rawResult = await axiosInstance.get(
          _PATH_API[rowData.__entity].sendTokenEmail({ id: rowData._id })
        );
      }
    } catch (error: any) {
      showNotification(constructErrorNotificationData(error));
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
      </Stack>
    </>
  );
};
