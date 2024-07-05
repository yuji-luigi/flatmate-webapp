import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import { usePaginationContext } from "../../../../context/PaginationContext";
import parentId from "../../../../pages/property-manager/dashboard/[entity]/parentId";
import {
  deleteLinkedChildDocumentWithPagination,
  deleteCrudDocumentWithPagination,
} from "../../../../redux/features/crudAsyncThunks";
import { ActionIcon, Menu, Text } from "@mantine/core";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { IconTrash } from "@tabler/icons-react";
import { sectionConfigsByUserType } from "../../../../json/section-config/sectionsConfig";
import { ActionCellProps } from "./action-cell-types";
import { useLocale } from "../../../../../hooks/useLocale";

export const DeleteActionCell: React.FC<ActionCellProps> = ({
  row,
  entity,
  parentId,
  isMenu = false,
  action,
}: ActionCellProps) => {
  const { openModal, openConfirmModal, closeModal } = useCustomModalContext();
  const { paginationQuery } = usePaginationContext();
  const { t } = useLocale();
  const onDelete = (): void => {
    openConfirmModal({
      title: "Delete",
      type: "alert",
      centered: true,
      labels: {
        cancel: "Cancel",
        confirm: "Delete",
      },
      children: <Text>Are you sure delete the data??</Text>,
      onCancel: closeModal,
      onConfirm: () => {
        parentId
          ? deleteLinkedChildDocumentWithPagination({
              entity,
              documentId: row._id,
              query: paginationQuery,
              // parentId,
            })
          : deleteCrudDocumentWithPagination({
              entity,
              documentId: row._id,
              query: paginationQuery,
            });
        closeModal();
      },
      opened: false,
    });
  };
  if (isMenu) {
    return (
      <Menu.Item
        leftSection={
          <ActionIcon color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        }
        onClick={onDelete}
      >
        {t(action.label || "Delete")}
      </Menu.Item>
    );
  }
  return (
    <ActionIcon color="red" onClick={onDelete}>
      <IconTrash size={16} stroke={1.5} />
    </ActionIcon>
  );
};
