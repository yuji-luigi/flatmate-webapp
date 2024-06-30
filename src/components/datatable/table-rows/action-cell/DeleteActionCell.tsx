import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import { usePaginationContext } from "../../../../context/PaginationContext";
import parentId from "../../../../pages/property-manager/dashboard/[entity]/parentId";
import {
  deleteLinkedChildDocumentWithPagination,
  deleteCrudDocumentWithPagination,
} from "../../../../redux/features/crudAsyncThunks";
import { ActionIcon, Text } from "@mantine/core";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { IconTrash } from "@tabler/icons-react";

type DeleteActionCellProps = {
  row: MongooseBaseModel;
  entity: FrontendEntity;
  parentId?: string;
};

export const DeleteActionCell: React.FC<DeleteActionCellProps> = ({
  row,
  entity,
  parentId,
}: DeleteActionCellProps) => {
  const { openModal, openConfirmModal, closeModal } = useCustomModalContext();
  const { paginationQuery } = usePaginationContext();

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
  return (
    <ActionIcon color="red" onClick={onDelete}>
      <IconTrash size={16} stroke={1.5} />
    </ActionIcon>
  );
};
