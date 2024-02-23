import {
  ActionIcon,
  Box,
  Button,
  List,
  ListItem,
  Menu,
  Modal,
  MultiSelect,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { RoleModel } from '../../../../../types/models/space-model';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';

const AddRoleButton = () => {
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');
  const { get, set } = useItemSlice<{ space: string; role: null | RoleModel }>();
  const [opened, setOpened] = React.useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);
  return (
    <>
      <TextInput
        readOnly
        onClick={handleOpen}
        placeholder="Add a role"
        value={get?.role?.name || ''}
        rightSection={
          <ActionIcon onClick={handleOpen}>
            <Icons.plus />
          </ActionIcon>
        }
      />
      <Modal
        centered
        onClose={handleClose}
        opened={opened}
        title="Select a role"
        classNames={{
          title: 'modalTitle',
          header: 'modalHeader',
          body: 'modalBody',
        }}
      >
        <List className="modalList">
          {roles.map((role) => (
            <ListItem
              className="modalListItem expand"
              key={role._id}
              onClick={() => {
                set((prev) => ({ ...prev, role }));
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
      transitionProps={{ transition: 'pop' }}
      withinPortal
    >
      <Menu.Target>
        <Button disabled={!get?.space} leftSection={<Icons.plus />}>
          Add a role
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {crudStatus === 'loading' ? (
          <Menu.Item>Loading...</Menu.Item>
        ) : (
          roles.map((role) => <Menu.Item key={role._id}>{role.name}</Menu.Item>)
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default AddRoleButton;
