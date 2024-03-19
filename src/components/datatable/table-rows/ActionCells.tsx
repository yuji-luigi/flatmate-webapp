import { Group, ActionIcon, Text } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { useDrawerContext } from "../../../context/DataTableDrawerContext";
import { usePaginationContext } from "../../../context/PaginationContext";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { useCustomModalContext } from "../../../context/modal-context/_ModalContext";
import { Sections } from "../../../types/general/data/sections-type";
import { QrCodeButton } from "./tablecell/action-cells/QrCodeButton";
import { MongooseBaseModel } from "../../../types/models/mongoose-base-model";

export function ActionCells({
  rowData,
  overridingEntity,
}: {
  rowData: MongooseBaseModel;
  overridingEntity?: Sections | null;
}) {
  const { paginationQuery } = usePaginationContext();
  const { openModal, openConfirmModal, closeModal } = useCustomModalContext();

  /** use hook context */
  const { openDrawer } = useDrawerContext();
  /** use hook router hook */
  const router = useRouter();
  const parentId = router.query.parentId as string;
  const entity = overridingEntity || (router.query.entity as Sections);

  /** use hook useCrudSlice */
  const {
    selectCrudDocument,
    deleteCrudDocumentWithPagination,
    deleteLinkedChildDocumentWithPagination,
  } = useCrudSliceStore();

  const onModify = (): void => {
    selectCrudDocument({ entity, document: rowData });
    openDrawer();
  };

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
              documentId: rowData._id,
              query: paginationQuery,
              // parentId,
            })
          : deleteCrudDocumentWithPagination({
              entity,
              documentId: rowData._id,
              query: paginationQuery,
            });
        closeModal();
      },
      opened: false,
      onClose(): void {
        closeModal();
      },
    });
  };

  return (
    <td>
      <Group gap={0} justify="center" align="center">
        <ActionIcon onClick={onModify}>
          <IconPencil size={16} stroke={1.5} />
        </ActionIcon>
        <ActionIcon color="red" onClick={onDelete}>
          <IconTrash size={16} stroke={1.5} />
        </ActionIcon>
        <QrCodeButton rowData={rowData} />
      </Group>
    </td>
  );
}
