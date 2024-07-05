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
import { IconPencil } from "@tabler/icons-react";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import { useDrawerContext } from "../../../../context/DataTableDrawerContext";
import { ActionCellProps } from "./action-cell-types";
import { useLocale } from "../../../../../hooks/useLocale";

export const EditActionCell: React.FC<ActionCellProps> = ({
  row,
  entity,
  parentId,
  isMenu,
  action,
}: ActionCellProps) => {
  const { t } = useLocale();
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
  if (isMenu) {
    return (
      <Menu.Item
        leftSection={
          <ActionIcon>
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
        }
        onClick={onModify}
      >
        {t(action.label || "Delete")}
      </Menu.Item>
    );
  }
  return (
    <ActionIcon onClick={onModify}>
      <IconPencil size={16} stroke={1.5} />
    </ActionIcon>
  );
};
