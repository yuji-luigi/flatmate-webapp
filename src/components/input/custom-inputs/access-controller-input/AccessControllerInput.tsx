import { Box, Button, Dialog, Modal, Tabs, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { AccessControllerFormFieldType } from '../../../../types/general/data/data-table/form-field-type/formField-types';
import { useLocale } from '../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { TabList } from '../../../tab/TabList';
import { Icons } from '../../../../data/icons/icons';
import SpaceSelectInput from '../../../select-custom/SpaceSelectInput';
import classes from './AccessControllerInput.module.css';
import { useItemSlice } from '../../../../redux/features/crud/selectedItemSlice';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { Role, RoleModel, UserModel } from '../../../../types/models/space-model';
import { SubmitByRoleButton } from './submit-buttons/SubmitByRoleButton';
import { SubmitAllRoleButton } from './submit-buttons/SubmitAllRoleButton';
import inputClasses from '../../input-style.module.css';
import { AccessControllerDisplay } from './access-controller-display/AccessControllerDisplay';
import {
  AccessControllerModel,
  permissionsDefaultValues,
  permissionsFormField,
} from '../../../../types/models/access-controller-type';
import { AccCtrlSpaceChips } from './space-chip/AccCtrlSpaceChips';
import AddRoleButton from './add-role-button/AddRoleButton';
import { PermissionsArraySwitches } from './permissions-form/PermissionsArraySwitches';
import { crudFormActions } from '../../../drawer/crud-form-action';

interface Prop {
  formField: AccessControllerFormFieldType;
  form: UseFormReturnType<Record<string, unknown>>;
}
export const AccessControllerInputButton = ({ formField, form, ...others }: Prop) => {
  const [show, setShow] = useState(false);
  const { t } = useLocale();
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  const { get } = useItemSlice<{ space: string | null; role: RoleModel }>();
  const { crudDocument: currentRole } = useCrudSelectors<RoleModel>('roles');

  const { openConfirmModal } = useCustomModalContext();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    fetchCrudDocuments({ entity: 'roles' });
    fetchCrudDocuments({ entity: 'accessControllers', queryObject: { user: selectedUser._id } });
    return () => {};
  }, []);
  const { crudDocuments: accessControllers } = useCrudSelectors<
    AccessControllerModel & { role: { name: Role; _id: string } }
  >('accessControllers');

  return (
    <>
      <Button
        style={{ placeContent: 'center' }}
        className={`${inputClasses.input}`}
        onClick={() => setOpen(true)}
        data-column="4"
        variant="outline"
        leftSection={<Icons.alert size={20} />}
      >
        {t('Manage Access')}
      </Button>
      <AccessControllerDisplay
        aCtrlValues={form.values.accessController as Record<string, boolean>[]}
      />
      <Modal
        size={900}
        centered
        opened={open}
        onClose={() => setOpen(false)}
        style={{ width: 500 }}
      >
        <AccessControllerFormContents formField={formField} form={form} {...others} />
      </Modal>
    </>
  );
};

const AccessControllerFormContents = (props: Prop) => {
  const { formField, form, ...others } = props;
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');
  const { crudDocuments: accessControllers } = useCrudSelectors<
    AccessControllerModel & { role: { name: Role; _id: string } }
  >('accessControllers');
  const { setCrudDocument } = useCrudSliceStore();

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
  return (
    <Tabs
      onChange={(value) =>
        setCrudDocument({ entity: 'roles', document: roles.find((role) => role._id === value) })
      }
    >
      <Box component="form" className={classes.formsByRole}>
        <SpaceSelectInput
          placeholder="Add permission in"
          size="sm"
          className={classes.spaceInput}
        />
        <AddRoleButton />

        <TabList
          list={tabList}
          classNames={{
            tabList: `${classes.tabList} ${classes.spaceInput}`,
            tab: classes.tab,
          }}
        />
        <Box>
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
          {/* <SubmitAllRoleButton form={form} /> */}
        </Box>
      </Box>
    </Tabs>
  );
};
