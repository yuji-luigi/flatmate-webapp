import { ActionIcon } from "@mantine/core";
import { IconQrcode } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import { HiddenAuthTokenInterface } from "../../../../../types/models/auth-token-model";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { _PATH_API } from "../../../../../path/path-api";
import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
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
