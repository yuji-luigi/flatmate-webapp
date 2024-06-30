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
import { IconPencil } from "@tabler/icons-react";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import { useDrawerContext } from "../../../../context/DataTableDrawerContext";

type DeleteActionCellProps = {
  row: MongooseBaseModel;
  entity: FrontendEntity;
  parentId?: string;
};

export const EditActionCell: React.FC<DeleteActionCellProps> = ({
  row,
  entity,
  parentId,
}: DeleteActionCellProps) => {
  const {
    selectCrudDocument,
    deleteCrudDocumentWithPagination,
    deleteLinkedChildDocumentWithPagination,
  } = useCrudSliceStore();
  const { openDrawer } = useDrawerContext();

  const { openModal, openConfirmModal, closeModal } = useCustomModalContext();
  const { paginationQuery } = usePaginationContext();
  const onModify = (): void => {
    selectCrudDocument({ entity, document: row });
    openDrawer();
  };

  return (
    <ActionIcon onClick={onModify}>
      <IconPencil size={16} stroke={1.5} />
    </ActionIcon>
  );
};
