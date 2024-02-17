import { Box, Button, Chip, Tabs, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { access } from 'fs';
import { AccessControllerFormFieldType } from '../../../../types/general/data/data-table/form-field-type/formField-types';
import { useLocale } from '../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { TabList } from '../../../tab/TabList';
import { Icons } from '../../../../data/icons/icons';
import { TabPanels } from '../../../tab/TabPanels';
import SpaceSelectInput from '../../../select-custom/SpaceSelectInput';
import classes from './AccessControllerInput.module.css';
import { PermissionsByRole } from './permissions-form/PermissionsByRole';
import { useItemSlice } from '../../../../redux/features/crud/selectedItemSlice';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { RoleModel, UserModel } from '../../../../types/models/space-model';
import { SubmitByRoleButton } from './submit-buttons/SubmitByRoleButton';
import { SubmitAllRoleButton } from './submit-buttons/SubmitAllRoleButton';
import inputClasses from '../../input-style.module.css';
import { AccessControllerDisplay } from './access-controller-display/AccessControllerDisplay';
import {
  AccessControllerModel,
  permissionsFormField,
} from '../../../../types/models/access-controller-type';
import { AccCtrlSpaceChip } from './space-chip/AccCtrlSpaceChip';

interface Prop {
  formField: AccessControllerFormFieldType;
  form: UseFormReturnType<Record<string, unknown>>;
}
export const AccessControllerForm = ({ formField, form, ...others }: Prop) => {
  const [show, setShow] = useState(false);
  const { t } = useLocale();
  useItemSlice<{ space: string | null }>({ space: '' });
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
  const [currentRole, setCurrentRole] = useState<string | null>('');
  const { formField, form: parentForm, ...others } = props;
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { get } = useItemSlice<{ space: string | null }>();
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  const { crudDocuments: accessControllers } =
    useCrudSelectors<AccessControllerModel>('accessControllers');
  console.log(accessControllers);
  useEffect(() => {
    fetchCrudDocuments({ entity: 'roles' });
    fetchCrudDocuments({ entity: 'accessControllers', queryObject: { user: selectedUser._id } });
  }, []);
  const initialValues = useMemo(() => {
    const object: Record<string, any> = {
      rootSpace: get?.space,
      user: selectedUser._id,
      parentForm,
    };

    //
    roles.forEach((role) => {
      const roleName = role.name;
      const permissionsByRole = accessControllers
        ?.filter((ctrl) => ctrl.rootSpace === get?.space)

        .find((item) => item.role?.name === roleName);
      permissionsFormField.forEach((field) => {
        const { name: permissionName } = field;
        object[roleName] = {
          ...object[roleName],
          [permissionName]:
            permissionsByRole?.permissions.find((p) => p.name === permissionName)?.allowed ||
            field.defaultValue,
        };
      });
    });
    return object;
  }, [roles.length, selectedUser._id, get?.space]);
  const form = useForm<Record<string, unknown>>({ initialValues });

  useEffect(() => {
    form.setValues(initialValues);
    setCurrentRole(roles[0]?.name);
  }, [initialValues]);

  if (crudStatus === 'loading') return <div>Loading...</div>;
  const tabList: TabList[] = roles.map((role) => {
    return {
      icon: <Icons.user size={20} />,
      label: role.name.toUpperCase(),
      value: role.name,
      component: PermissionsByRole,
      componentProps: { role: role.name },
      form,
    };
  });

  if (!tabList.length) return <div>loading...</div>;
  return (
    <Tabs defaultValue={tabList[0].value} onChange={setCurrentRole}>
      <Box component="form" className={classes.formsByRole}>
        <SpaceSelectInput size="sm" className={classes.spaceInput} />
        <TabList
          list={tabList}
          classNames={{
            tabList: `${classes.tabList} ${classes.spaceInput}`,
            tab: classes.tab,
          }}
        />
        <Box>
          {accessControllers?.length ? (
            accessControllers.map((accessController) => (
              <AccCtrlSpaceChip key={accessController._id} accCtrl={accessController} />
            ))
          ) : (
            <Text fw="bold">
              select building and give access to the user for the selected building
            </Text>
          )}
        </Box>
        <Box className={classes.tabPanels}>
          <TabPanels list={tabList} form={form} />
        </Box>
        <Box className={classes.buttons}>
          <SubmitByRoleButton form={form} currentRole={currentRole} />
          <SubmitAllRoleButton form={form} />
        </Box>
      </Box>
    </Tabs>
  );
};
