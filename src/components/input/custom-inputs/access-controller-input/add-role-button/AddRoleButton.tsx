import { ActionIcon, Button, List, ListItem, Menu, Modal } from '@mantine/core';
import React from 'react';
import { Icons } from '../../../../../data/icons/icons';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { RoleModel } from '../../../../../types/models/space-model';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';

const AddRoleButton = () => {
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');
  const { get } = useItemSlice<{ space: string }>();
  const [opened, setOpened] = React.useState(false);
  const handleOpen = () => setOpened(true);
  const handleClose = () => setOpened(false);
  return (
    <>
      <Button disabled={!get?.space} onClick={handleOpen} leftSection={<Icons.plus />}>
        Add a role
      </Button>
      <Modal centered opened={opened} onClose={handleClose}>
        <ul className="ulEl">
          {roles.map((role) => (
            <li key={role._id}>{role.name}</li>
          ))}
        </ul>
      </Modal>
    </>
  );
  // return (
  //   <Menu
  //     withArrow
  //     width={150}
  //     position="bottom"
  //     transitionProps={{ transition: 'pop' }}
  //     withinPortal
  //   >
  //     <Menu.Target>
  //       <Button disabled={!get?.space} leftSection={<Icons.plus />}>
  //         Add a role
  //       </Button>
  //     </Menu.Target>
  //     <Menu.Dropdown>
  //       {crudStatus === 'loading' ? (
  //         <Menu.Item>Loading...</Menu.Item>
  //       ) : (
  //         roles.map((role) => <Menu.Item key={role._id}>{role.name}</Menu.Item>)
  //       )}
  //     </Menu.Dropdown>
  //   </Menu>
  // );
};

export default AddRoleButton;
