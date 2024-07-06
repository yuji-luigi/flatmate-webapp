import { ActionIcon, Menu, Text } from "@mantine/core";
import { IconQrcode, IconUserCancel } from "@tabler/icons-react";
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
import { useLocale } from "../../../../../../hooks/useLocale";
import { useCrudSliceStore } from "../../../../../redux/features/crud/crudSlice";

export const RemoveUserFromUnitAction = ({ row, entity, isMenu, action }: ActionCellProps) => {
  const { openConfirmModal } = useCustomModalContext();
  const { updateOneCrudDocument } = useCrudSliceStore();
  const { t } = useLocale();
  const deleteConfirm = () => {
    axiosInstance
      .delete(apiEndpoint.units.userById(row._id))
      .then((res) => {
        updateOneCrudDocument({
          entity: "units",
          updatedDocument: res.data.data,
        });
        showNotification({
          title: "Success",
          message: "User removed",
          color: "green",
        });
      })
      .catch((err) => {
        showNotification({
          title: "Error",
          message: "An error occurred while removing the user",
          color: "red",
        });
      });
  };
  const handleOnClick = () => {
    openConfirmModal({
      title: "Remove User",
      type: "alert",
      centered: true,
      labels: {
        cancel: "Cancel",
        confirm: "Remove",
      },
      children: <Text>Are you sure you want to remove this user from the unit?</Text>,
      onConfirm: deleteConfirm,
      opened: false,
    });
  };

  if (isMenu) {
    return (
      <Menu.Item
        onClick={handleOnClick}
        leftSection={
          <ActionIcon color="white">
            <IconUserCancel />
          </ActionIcon>
        }
      >
        {t(action.label || "Remove User From Unit")}
      </Menu.Item>
    );
  }
  return (
    <ActionIcon color="white">
      <IconQrcode size={16} />
    </ActionIcon>
  );
};
