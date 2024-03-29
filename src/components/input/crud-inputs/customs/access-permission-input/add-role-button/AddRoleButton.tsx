import {
  ActionIcon,
  Box,
  Button,
  Group,
  List,
  ListItem,
  Menu,
  Modal,
  MultiSelect,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import React from "react";
import { showNotification } from "@mantine/notifications";
import { UseFormReturnType } from "@mantine/form";
import { Icons } from "../../../../../../data/icons/icons";
import { useCrudSelectors } from "../../../../../../redux/features/crud/crudSlice";
import {
  RoleModel,
  SpaceModel,
  AccessPermissionModel,
} from "../../../../../../types/models/space-model";
import { useItemSlice } from "../../../../../../redux/features/crud/selectedItemSlice";
import { useLocale } from "../../../../../../../hooks/useLocale";
import { useCreateAccessPermissionValue } from "../useCreateAccessPermissionValue";

const AddRoleButton = ({ form }: { form: UseFormReturnType<Record<string, any>> }) => {
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>("roles");
  const { t } = useLocale("common");
  const { get, set } = useItemSlice<{ space: SpaceModel; role: null | RoleModel }>();
  const [selectedRole, setSelectedRole] = React.useState<RoleModel | null>(null);
  const newlyACrtl = useCreateAccessPermissionValue({ selectedRole });
  const [opened, setOpened] = React.useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);
  const handleAddRole = () => {
    if (!selectedRole) {
      showNotification({ title: t("Error"), message: t("Please select a role"), color: "red" });
      return;
    }
    set((prev) => ({ ...prev, role: selectedRole }));
    const foundAccessPermission = form.values.accessPermissions?.find(
      (actrl: Omit<AccessPermissionModel, "_id">) =>
        actrl.role === newlyACrtl.role && actrl.space === newlyACrtl.space
    );
    const updatedAccessPermissions = foundAccessPermission
      ? form.values.accessPermissions?.map((actrl: Omit<AccessPermissionModel, "_id">) => {
          if (actrl.role === newlyACrtl.role && actrl.space === newlyACrtl.space) {
            return newlyACrtl;
          }
          return actrl;
        })
      : [...form.values.accessPermissions, newlyACrtl];

    form.setValues((prev) => ({ ...prev, accessPermissions: updatedAccessPermissions }));
  };
  const handleReset = () => {
    setSelectedRole(null);
    set((prev) => ({ ...prev, role: null }));
  };
  const disabled = !get?.space;
  return (
    <>
      <TextInput
        disabled={disabled}
        readOnly
        onClick={handleOpen}
        placeholder={t("Add a role")}
        value={selectedRole?.name || ""}
        rightSectionWidth={70}
        rightSection={
          <Box className="inputRightIcons">
            <Tooltip label={disabled ? t("Please select a space") : t("Add")}>
              <ActionIcon disabled={disabled || !selectedRole} onClick={handleAddRole}>
                <Icons.plus />
              </ActionIcon>
            </Tooltip>
            <Tooltip label={disabled ? t("Please select a space") : t("Reset")}>
              <ActionIcon disabled={disabled || !selectedRole} onClick={handleReset}>
                <Icons.reload />
              </ActionIcon>
            </Tooltip>
          </Box>
        }
      />
      <Modal
        centered
        onClose={handleClose}
        opened={opened}
        title={t("Select a role")}
        classNames={{
          title: "modalTitle",
          header: "modalHeader",
          body: "modalBody",
        }}
      >
        <List className="modalList">
          {roles.map((role) => (
            <ListItem
              className="modalListItem expand"
              key={role._id}
              onClick={() => {
                setSelectedRole(role);
                handleClose();
              }}
            >
              {role.name}
            </ListItem>
          ))}
        </List>
      </Modal>
    </>
  );
  return (
    <Menu
      withArrow
      width={150}
      position="bottom"
      transitionProps={{ transition: "pop" }}
      withinPortal
    >
      <Menu.Target>
        <Button disabled={!get?.space} leftSection={<Icons.plus />}>
          Add a role
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {crudStatus === "loading" ? (
          <Menu.Item>Loading...</Menu.Item>
        ) : (
          roles.map((role) => <Menu.Item key={role._id}>{role.name}</Menu.Item>)
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default AddRoleButton;
