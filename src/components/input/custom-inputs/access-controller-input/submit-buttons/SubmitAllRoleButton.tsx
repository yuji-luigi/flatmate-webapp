import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { _PATH_API } from '../../../../../path/path-api';
import axiosInstance from '../../../../../utils/axios-instance';
import { useLocale } from '../../../../../../hooks/useLocale';
import { useCustomModalContext } from '../../../../../context/modal-context/_ModalContext';
import { useCrudSelectors } from '../../../../../redux/features/crud/crudSlice';
import { RoleModel } from '../../../../../types/models/space-model';

type SubmitAllRoleButtonProps = {
  form: UseFormReturnType<Record<string, unknown>>;
};

export const SubmitAllRoleButton: React.FC<SubmitAllRoleButtonProps> = (
  props: SubmitAllRoleButtonProps
) => {
  const { form } = props;
  const { crudDocuments: roles } = useCrudSelectors<RoleModel>('roles');
  const roleNames = roles.map((role) => role.name);
  const { parentForm } = form.values as Record<string, unknown> & {
    parentForm: UseFormReturnType<Record<string, unknown>>;
  };
  const { t } = useLocale();
  const { closeModal } = useCustomModalContext();

  const handleSubmitAllRoles: React.MouseEventHandler<HTMLButtonElement> = async () => {
    const { user, rootSpace } = form.values;
    if (!rootSpace) {
      showNotification({ message: t('Please select a building/space'), title: t('Error') });
      return;
    }

    const aCtrlValues = roleNames.map((role) => {
      return {
        // todo: fix the type of form.values
        //@ts-ignore
        ...form.values[role],
        roleName: role,
        rootSpace,
      };
    });

    // case update user: (user, rootSpace are present update the accessController of the user)
    if (user && rootSpace) {
      const rawAccessControl = await axiosInstance.post(_PATH_API.accessControllers.root, {
        user,
        rootSpace,
      });
    }
    // case creation of a new user.
    if (!user && rootSpace) {
      parentForm.setValues({
        ...parentForm.values,
        accessController: aCtrlValues,
      });
      closeModal();
    }
  };
  return <Button onClick={handleSubmitAllRoles}>Apply all Roles</Button>;
};
