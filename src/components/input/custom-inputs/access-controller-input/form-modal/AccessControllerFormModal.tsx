import { Modal, Tabs, Box, Text, ModalHeader } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Icons } from '../../../../../data/icons/icons';
import { useCrudSelectors, useCrudSliceStore } from '../../../../../redux/features/crud/crudSlice';
import { AccessControllerModel } from '../../../../../types/models/access-controller-type';
import { RoleModel, Role, SpaceModel } from '../../../../../types/models/space-model';
import SpaceSelectInput from '../../../../select-custom/SpaceSelectInput';
import { TabList } from '../../../../tab/TabList';
import AddRoleButton from '../add-role-button/AddRoleButton';
import { PermissionsArraySwitches } from '../permissions-form/PermissionsArraySwitches';
import { AccCtrlSpaceChips } from '../space-chip/AccCtrlSpaceChips';
import { SubmitByRoleButton } from '../submit-buttons/SubmitByRoleButton';
import classes from '../AccessControllerInput.module.css';
import { useItemSlice } from '../../../../../redux/features/crud/selectedItemSlice';

export const AccessControllerFormModal = (props: {
  form: UseFormReturnType<Record<string, any>>;
  opened: boolean;
  closeModal: () => void;
}) => {
  const { opened, closeModal, form } = props;
  const { get } = useItemSlice<{ space?: SpaceModel; role?: RoleModel }>();
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');

  if (crudStatus === 'loading') return <div>Loading...</div>;
  const tabList: TabList[] = roles.map((role) => {
    return {
      icon: <Icons.user size={20} />,
      label: role.name.toUpperCase(),
      value: role.name,
      component: null,
      componentProps: { role: role.name },
    };
  });
  if (!tabList.length) return <div>loading...</div>;
  const canProceed = get?.space && get.role;
  return (
    <Modal
      centered
      opened={opened}
      onClose={closeModal}
      title="Manage Access Control"
      classNames={{
        title: 'modalTitle',
        header: 'modalHeader',
        body: 'modalBody',
      }}
    >
      <Box component="form" className={classes.formsByRole}>
        <SpaceSelectInput placeholder="Add permission in" size="sm" />
        <AddRoleButton />
        {canProceed && <PermissionsArraySwitches form={form} />}

        {/* <Box>
          {accessControllers?.length ? (
            <AccCtrlSpaceChips />
          ) : (
            <Text fw="bold">
              select building and give access to the user for the selected building
            </Text>
          )}
        </Box>
        <Box className={classes.tabPanels}>
          <PermissionsArraySwitches form={form} />
        </Box>
        <Box className={classes.buttons}>
          <SubmitByRoleButton form={form} />
        </Box> */}
      </Box>
    </Modal>
  );
};
