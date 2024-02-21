import { Box, Button, Tabs, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { AccessControllerFormFieldType } from '../../../../types/general/data/data-table/form-field-type/formField-types';
import { useLocale } from '../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { TabList } from '../../../tab/TabList';
import { Icons } from '../../../../data/icons/icons';
import SpaceSelectInput from '../../../select-custom/SpaceSelectInput';
import classes from './AccessControllerInput.module.css';
import { PermissionsByRole } from './permissions-form/PermissionsByRole';
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

interface Prop {
  formField: AccessControllerFormFieldType;
  form: UseFormReturnType<Record<string, unknown>>;
}
export const AccessControllerInputButton = ({ formField, form, ...others }: Prop) => {
  const [show, setShow] = useState(false);
  const { t } = useLocale();
  useItemSlice<{ space: string | null }>({ space: '' });
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');

  const handleShowInputs = () => {
    setShow(!show);
    openConfirmModal({
      title: <Text className="title">Manage Access Control</Text>,
      type: 'custom',
      onClose: () => setShow(false),
      opened: show,
      withinPortal: true,
      size: 900,
      children: <AccessControllerFormContents formField={formField} form={form} {...others} />,
    });
  };
  const { openConfirmModal } = useCustomModalContext();
  useEffect(() => {
    fetchCrudDocuments({ entity: 'roles' });
    fetchCrudDocuments({ entity: 'accessControllers', queryObject: { user: selectedUser._id } });
    return () => {};
  }, []);
  return (
    <>
      <Button
        style={{ placeContent: 'center' }}
        className={`${inputClasses.input}`}
        onClick={handleShowInputs}
        data-column="4"
        variant="outline"
        leftSection={<Icons.alert size={20} />}
      >
        {t('Manage Access')}
      </Button>
      <AccessControllerDisplay
        aCtrlValues={form.values.accessController as Record<string, boolean>[]}
      />
    </>
  );
};

const AccessControllerFormContents = (props: Prop) => {
  const [currentRole, setCurrentRole] = useState<RoleModel | null | undefined>(null);
  const { formField, form, ...others } = props;
  const [go, setGo] = useState(false);
  const accessControlForm = useForm<Record<string, unknown>>();
  const { get } = useItemSlice<{ space: string | null }>();
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  const { crudDocuments: accessControllers } = useCrudSelectors<
    AccessControllerModel & { role: { name: Role; _id: string } }
  >('accessControllers');
  const accessController = useMemo(() => {
    const _accessController = accessControllers.find(
      (aCtrl) => aCtrl.role._id === currentRole?._id && aCtrl.space
    );
    const defaultValue = permissionsFormField.reduce<
      Omit<AccessControllerModel, 'createdAt' | '_id' | 'updatedAt'>
    >(
      (acc, permission) => {
        return acc;
      },
      {
        user: selectedUser._id,
        role: currentRole?._id || '',
        space: get?.space || '',
        permissions: permissionsDefaultValues,
      }
    );

    return _accessController || defaultValue;
  }, [currentRole?._id, get?.space]);

  // const form = useForm<Record<string, unknown>>({ initialValues });

  useEffect(() => {
    accessControlForm.setValues(accessController);
    // setGo(true);
  }, [accessController]);

  if (crudStatus === 'loading') return <div>Loading...</div>;
  const tabList: TabList[] = roles.map((role) => {
    return {
      icon: <Icons.user size={20} />,
      label: role.name.toUpperCase(),
      value: role.name,
      component: PermissionsArraySwitches,
      componentProps: { role: role.name },
      form: accessControlForm,
    };
  });

  if (!tabList.length) return <div>loading...</div>;
  return (
    <Tabs onChange={(value) => setCurrentRole(roles.find((role) => role._id === value))}>
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
        <PermissionsArraySwitches role={currentRole?.name || ''} form={accessControlForm} />
        {/* <Box className={classes.tabPanels}>
          <TabPanels list={tabList} form={form} />
        </Box> */}
        <Box className={classes.buttons}>
          <SubmitByRoleButton form={accessControlForm} currentRole={currentRole} />
          <SubmitAllRoleButton form={accessControlForm} />
        </Box>
      </Box>
    </Tabs>
  );
};
