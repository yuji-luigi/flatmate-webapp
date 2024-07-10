import { ActionIcon, Menu, Text } from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { HiddenAuthTokenInterface } from "../../../../../types/models/auth-token-model";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { apiEndpoint } from "../../../../../path/path-api";
import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
import { QrCodeModalContent } from "./QrCodeModalContent";
import { MongooseBaseModel } from "../../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";
import {
  INVITATION_STATUS,
  pendingInvitationStatuses,
} from "../../../../../types/models/invitation-model";
import { ActionCellProps } from "../../action-cell/action-cell-types";
import { t } from "i18next";

export const QrCodeButton = ({ row, entity, isMenu, action }: ActionCellProps) => {
  const { openConfirmModal } = useCustomModalContext();
  const { _id } = row;

  const generateQrCode = async () => {
    try {
      const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
        apiEndpoint.invitations.getAuthTokenByEntityRowId({ rowId: _id, entity }),
        { params: { status: { $in: pendingInvitationStatuses } } }
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
  if (isMenu) {
    return (
      <Menu.Item
        leftSection={
          <ActionIcon color="white">
            <IconQrcode />
          </ActionIcon>
        }
        onClick={generateQrCode}
      >
        {t(action.label || "QR Code")}
      </Menu.Item>
    );
  }
  return (
    <ActionIcon color="white" onClick={generateQrCode}>
      <IconQrcode />
    </ActionIcon>
  );
};
