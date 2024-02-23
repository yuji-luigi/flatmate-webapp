import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { UseFormReturnType } from '@mantine/form';
import { useLocale } from '../../../../../hooks/useLocale';
import { Icons } from '../../../../data/icons/icons';
import { useCrudSelectors, useCrudSliceStore } from '../../../../redux/features/crud/crudSlice';
import { UserModel } from '../../../../types/models/space-model';
import inputClasses from '../../input-style.module.css';
import { AccessControllerDisplay } from './access-controller-display/AccessControllerDisplay';
import { AccessControllerFormModal } from './form-modal/AccessControllerFormModal';

interface Prop {
  form: UseFormReturnType<Record<string, any>>;
}
export const AccessControllerFormButton = ({ form, ...others }: Prop) => {
  const { t } = useLocale();
  const { fetchCrudDocuments } = useCrudSliceStore();
  const { crudDocument: selectedUser } = useCrudSelectors<UserModel>('users');
  const [opened, setOpened] = useState(false);

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
        onClick={() => setOpened(true)}
        data-column="4"
        variant="outline"
        leftSection={<Icons.alert size={20} />}
      >
        {t('Manage Access')}
      </Button>
      <AccessControllerDisplay
        aCtrlValues={form.values.accessController as Record<string, boolean>[]}
      />

      <AccessControllerFormModal
        form={form}
        opened={opened}
        closeModal={() => setOpened(false)}
        {...others}
      />
    </>
  );
};
