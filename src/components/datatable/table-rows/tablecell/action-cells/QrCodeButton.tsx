import { ActionIcon, Box, Button, Card, Group, Stack } from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { showNotification } from "@mantine/notifications";
import {
  AuthTokenModel,
  HiddenAuthTokenInterface,
} from "../../../../../types/models/auth-token-model";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { API_BASE_URL, PATH_API, _PATH_API } from "../../../../../path/path-api";
import { getEntityFromUrl } from "../../../../../utils/helpers/helper-functions";
import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";
import { QrCodeModalContent } from "./QrCodeModalContent";
import { MongooseBaseModel } from "../../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";

export const QrCodeButton = ({
  row,
  entity,
}: {
  row: MongooseBaseModel;
  entity: FrontendEntity;
}) => {
  const { openConfirmModal } = useCustomModalContext();
  const { _id } = row;

  const generateQrCode = async () => {
    try {
      // TODO: make a endpoint string locally and map that to the actual endpoint
      const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
        _PATH_API.invitations.getAuthTokenByEntityRowId({ rowId: _id, entity })
      );

      const payload = rawAuthToken.data.data;

      openConfirmModal({
        title: "QR Code",
        type: "custom",
        children: <QrCodeModalContent authToken={payload} row={row} />,
        // onConfirm: () => {},
      });
    } catch (error: any) {
      console.error(error);
      showNotification({
        title: "Error",
        message: error.message || error,
        color: "red",
      });
    }
  };
  return (
    <ActionIcon color="white" onClick={generateQrCode}>
      <IconQrcode />
    </ActionIcon>
  );
};
