import { Modal, Tabs, Box, Text, ModalHeader } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { Icons } from '../../../../../../data/icons/icons';
import {
  useCrudSelectors,
  useCrudSliceStore,
} from '../../../../../../redux/features/crud/crudSlice';
import {
  RoleModel,
  Role,
  SpaceModel,
  AccessPermissionModel,
} from '../../../../../../types/models/space-model';
import SpaceSelectInput from '../../../../custom-inputs/SpaceSelectInput';
import { TabList } from '../../../../../tab/TabList';
import AddRoleButton from '../add-role-button/AddRoleButton';
import { PermissionsArraySwitches } from '../permissions-form/PermissionsArraySwitches';
import { AccCtrlSpaceChips } from '../space-chip/AccCtrlSpaceChips';
import { SubmitByRoleButton } from '../submit-buttons/SubmitByRoleButton';
import classes from '../AccessPermissionInput.module.css';
import { useItemSlice } from '../../../../../../redux/features/crud/selectedItemSlice';
import { useLocale } from '../../../../../../../hooks/useLocale';

export const AccessPermissionFormModal = (props: {
  form: UseFormReturnType<Record<string, any>>;
  opened: boolean;
  closeModal: () => void;
}) => {
  const { opened, closeModal, form } = props;
  const { t } = useLocale('common');
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
      fullScreen
      // title={t('Manage Access Control')}
      classNames={{
        title: 'modalTitle',
        header: 'modalHeader',
        body: 'modalBody',
      }}
    >
      <Box component="form" className="access-control-modal-content">
        <Text className="modalTitle" mb={16}>
          {t('Manage Access Control')}
        </Text>
        <Box className="access-control-modal-Add-new-section">
          <Box className="access-control-modal-first-inputs">
            <Text size="xl" fw={700}>
              {t('Add new access control')}
            </Text>
            <SpaceSelectInput placeholder={t('Add permission in')} size="sm" />
            <AddRoleButton form={form} />
          </Box>
          <Box className="access-control-modal-permission-switches">
            {form.values.accessPermissions?.map((actrl: AccessPermissionModel) => (
              <PermissionsArraySwitches
                key={typeof actrl.role === 'string' ? actrl.role : actrl.role._id}
                form={form}
                actrl={actrl}
              />
            ))}
          </Box>
        </Box>
        {/* {canProceed && <PermissionsArraySwitches form={form} />}
        {canProceed && <PermissionsArraySwitches form={form} />} */}
        {/* <Box>
          {accessPermissions?.length ? (
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
