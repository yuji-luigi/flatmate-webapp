import { Group, ActionIcon, Button, Menu, rem } from "@mantine/core";
import { IconDotsVertical, IconPencil, IconSettings, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/router";
import useAuth from "../../../../../hooks/useAuth";
import { useCustomModalContext } from "../../../../context/modal-context/_ModalContext";
import { usePaginationContext } from "../../../../context/PaginationContext";
import { useGetSectionConfig } from "../../../../hooks/useGetSectionConfig";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import { FrontendEntity } from "../../../../types/redux/CrudSliceInterfaces";
import { QrCodeButton } from "../tablecell/action-cells/QrCodeButton";
import { useDrawerContext } from "../../../../context/DataTableDrawerContext";
import { ActionCellController, ActionMenuController } from "./ActionCellController";
import { Icons } from "../../../../data/icons/icons";
import { IconButton } from "../../../button/IconButton";
import { Fragment } from "react";

export function ActionCells({
  rowData,
  overridingEntity,
}: {
  rowData: MongooseBaseModel;
  overridingEntity?: FrontendEntity | null;
}) {
  const router = useRouter();
  const parentId = router.query.parentId as string;
  const {
    query: { entity },
  } = useRouterWithCustomQuery();
  const sectionConfig = useGetSectionConfig();
  if (!entity) {
    throw new Error("entity query is used in non crud page");
  }
  return (
    <>
      <Menu
        shadow="md"
        position="left-start"
        offset={0}
        trigger="hover"
        openDelay={100}
        closeDelay={100}
      >
        <Menu.Target>
          <div>
            <IconButton icon={<IconDotsVertical />} />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          {sectionConfig?.rowActions?.map((action) => (
            <ActionMenuController
              key={action.type}
              action={action}
              row={rowData}
              entity={entity}
              parentId={parentId}
            />
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
  return (
    <td>
      <Group gap={0} justify="center" align="center">
        {sectionConfig?.rowActions?.map((action) => (
          <ActionCellController action={action} row={rowData} entity={entity} parentId={parentId} />
        ))}
      </Group>
    </td>
  );
}
