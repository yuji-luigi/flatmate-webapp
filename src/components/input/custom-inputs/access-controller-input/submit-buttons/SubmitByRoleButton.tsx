import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { showNotification, useNotifications } from '@mantine/notifications';
import { title } from 'process';
import axiosInstance from '../../../../../utils/axios-instance';
import { _PATH_API } from '../../../../../path/path-api';
import { NOTIFICATIONS } from '../../../../../data/showNofification/notificationObjects';
import { useLocale } from '../../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../../context/modal-context/_ModalContext';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { RoleModel } from '../../../../../types/models/space-model';

type SubmitByRoleButtonProps = {
  form: UseFormReturnType<Record<string, unknown>>;
};

export const SubmitByRoleButton: React.FC<SubmitByRoleButtonProps> = (
  props: SubmitByRoleButtonProps
) => {
  const { closeModal } = useCustomModalContext();
  const { form } = props;
  const { t } = useLocale();
  const { crudDocument: currentRole } = useCrudSelectors<RoleModel>('roles');
  const handleSubmitByRole = async () => {
    const { user, space } = form.values;
    if (!currentRole) return;
    if (!space) {
      showNotification({ message: t('Please select a building/space'), title: t('Error') });
      return;
    }
    // case update user: (user, space are present update the accessController of the user)
    const data = form.values.accessController as Record<string, boolean>;
    if (user && space) {
      const rawAccessControl = await axiosInstance.post(_PATH_API.accessControllers.root, data);
      showNotification({ message: t('Access Control updated'), title: t('Success') });
    }
    // case creation of a new user.
    if (!user && space) {
      closeModal();
    }
  };
  return <Button onClick={handleSubmitByRole}>submit</Button>;
};
