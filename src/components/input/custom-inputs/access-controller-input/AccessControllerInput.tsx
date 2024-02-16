import { Accordion, Box, Button, Chip, Stack, Tabs, Text } from '@mantine/core';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { UseFormReturnType, useForm } from '@mantine/form';
import { UseFormReturnTypeCustom } from '../../input_interfaces/useForm_interface';
import { AccessControllerFormFieldType } from '../../../../types/general/data/data-table/form-field-type/formField-types';
import { useLocale } from '../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../context/modal-context/_ModalContext';
import { TabList } from '../../../tab/TabList';
import { Icons } from '../../../../data/icons/icons';
import { TabPanels } from '../../../tab/TabPanels';
import CrudSelect from '../../crud-inputs/CrudSelect';
import SpaceSelectInput from '../../../select-custom/SpaceSelectInput';
import classes from './AccessControllerInput.module.css';
import { PermissionsByRole } from './permissions-form/PermissionsByRole';
import { useItemSlice } from '../../../../redux/features/crud/selectedItemSlice';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { RoleModel, UserModel } from '../../../../types/models/space-model';
import axiosInstance from '../../../../utils/axios-instance';
import { PATH_API, _PATH_API } from '../../../../path/path-api';
import { SubmitByRoleButton } from './submit-buttons/SubmitByRoleButton';
import { SubmitAllRoleButton } from './submit-buttons/SubmitAllRoleButton';
import inputClasses from '../../input-style.module.css';
import { AccessControllerDisplay } from './access-controller-display/AccessControllerDisplay';

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
      <AccessControllerDisplay aCtrlValues={form.values.accessController} />
    </>
  );
};

const buildingItems = [
  { _id: '1', name: 'Central Tower', color: 'Gray' },
  { _id: '2', name: 'Riverside Apartments', color: 'Blue' },
  { _id: '3', name: 'Marketplace Hub', color: 'Brown' },
  { _id: '4', name: 'Greenwood Park', color: 'Green' },
  { _id: '5', name: 'Harbor View', color: 'Cyan' },
  { _id: '6', name: 'Sunset Villas', color: 'Orange' },
  { _id: '7', name: 'Tech Innovations Lab', color: 'Silver' },
  { _id: '8', name: 'Historic Museum', color: 'Maroon' },
  { _id: '9', name: 'Lakeside Retreat', color: 'Teal' },
  { _id: '10', name: 'Urban Art Gallery', color: 'Violet' },
  { _id: '11', name: 'Digital Startups Hub', color: 'Magenta' },
  { _id: '12', name: 'Eco-Friendly Complex', color: 'Lime' },
  { _id: '13', name: 'Skyline Condos', color: 'Sky Blue' },
  { _id: '14', name: 'Metropolitan Library', color: 'Beige' },
  // { _id: '15', name: 'Cultural Center', color: 'Gold' },
  // { _id: '16', name: 'Health and Wellness Center', color: 'Peach' }
];

const AccessControllerFormContents = (props: Prop) => {
  const { t } = useLocale();
  const [currentRole, setCurrentRole] = useState<string | null>('');
  const { formField, form: parentForm, ...others } = props;
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { get } = useItemSlice<{ space: string | null }>();
  const { crudDocuments: roles, crudStatus } = useCrudSelectors<RoleModel>('roles');
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  useEffect(() => {
    fetchCrudDocuments({ entity: 'roles' });
  }, []);
  const initialValues = useMemo(() => {
    const object: Record<string, unknown> = {
      rootSpace: get?.space,
      user: selectedUser._id,
      parentForm,
    };
    roles.forEach((role) => {
      object[role.name] = {
        canCreatePost: false,
        canCreateMaintenance: false,
        canNotifyMaintainer: false,
        canDeletePost: false,
        canDeleteMaintenance: false,
        canDeleteComment: false,
      };
    });
    return object;
  }, [roles.length, selectedUser._id, get?.space]);
  // const { crudDocument: user } = useCrudSelectors('users');
  // console.log(user);
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
      {/* <Accordion chevronPosition="right" variant="contained">
          <Accordion.Item value="a">
            <Accordion.Control>{t('See assigned spaces of the user')}</Accordion.Control>

            <Accordion.Panel>
              <Stack style={{ gap: 'var(--flex-gap)' }}>
                {t('Click to see the access control in the building')}:
                <Box className={classes.chipsGrid}>
                  {buildingItems.map((rootSpace) => (
                    <Chip color={rootSpace.color} key={rootSpace._id} checked>
                      {rootSpace.name}
                    </Chip>
                  ))}
                </Box>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion> */}
      <Box component="form" className={classes.formsByRole}>
        <SpaceSelectInput size="sm" className={classes.spaceInput} />
        <TabList
          list={tabList}
          classNames={{
            tabList: `${classes.tabList} ${classes.spaceInput}`,
            tab: classes.tab,
          }}
        />
        <Text fw="bold">select building and give access to the user for the selected building</Text>
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
