import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { showNotification, useNotifications } from '@mantine/notifications';
import { title } from 'process';
import axiosInstance from '../../../../../utils/axios-instance';
import { _PATH_API } from '../../../../../path/path-api';
import { NOTIFICATIONS } from '../../../../../data/showNofification/notificationObjects';
import { useLocale } from '../../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../../context/modal-context/_ModalContext';

type SubmitByRoleButtonProps = {
  form: UseFormReturnType<Record<string, unknown>>;
  currentRole: string | null;
};

export const SubmitByRoleButton: React.FC<SubmitByRoleButtonProps> = (
  props: SubmitByRoleButtonProps
) => {
  const { closeModal } = useCustomModalContext();
  const { form, currentRole } = props;
  const { t } = useLocale();
  const notification = useNotifications();
  const { parentForm } = form.values as Record<string, unknown> & {
    parentForm: UseFormReturnType<Record<string, unknown>>;
  };
  const handleSubmitByRole = async () => {
    const { user, rootSpace } = form.values;
    if (!currentRole) return;
    if (!rootSpace) {
      showNotification({ message: t('Please select a building/space'), title: t('Error') });
      return;
    }
    // case update user: (user, rootSpace are present update the accessController of the user)
    const currentFields = form.values[currentRole] as Record<string, boolean>;
    if (user && rootSpace) {
      const rawAccessControl = await axiosInstance.post(_PATH_API.accessControllers.root, {
        user,
        rootSpace,
        [currentRole]: currentFields,
      });
    }
    // case creation of a new user.
    if (!user && rootSpace) {
      parentForm.setValues({
        ...parentForm.values,
        accessController: [{ ...currentFields, rootSpace, roleName: currentRole }],
      });
      closeModal();
    }
  };
  return <Button onClick={handleSubmitByRole}>submit</Button>;
};
