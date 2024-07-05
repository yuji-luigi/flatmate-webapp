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

export const RemoveUserFromUnitAction = ({ row, entity, isMenu, action }: ActionCellProps) => {
  const { openConfirmModal } = useCustomModalContext();
  const { t } = useLocale();
  if (isMenu) {
    return (
      <Menu.Item
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
