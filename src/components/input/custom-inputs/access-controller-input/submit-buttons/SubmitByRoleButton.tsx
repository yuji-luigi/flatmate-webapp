import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import axiosInstance from '../../../../../utils/axios-instance';
import { _PATH_API } from '../../../../../path/path-api';

type SubmitByRoleButtonProps = {
  form: UseFormReturnType<Record<string, unknown>>;
  currentRole: string | null;
};

export const SubmitByRoleButton: React.FC<SubmitByRoleButtonProps> = (
  props: SubmitByRoleButtonProps
) => {
  const { form, currentRole } = props;
  const handleSubmitByRole = async () => {
    if (!currentRole) return;
    const { user, rootSpace } = form.values;
    const currentFields = form.values[currentRole] as Record<string, boolean>;
    const rawAccessControl = await axiosInstance.post(_PATH_API.accessControllers.root, {
      user,
      rootSpace,

      [currentRole]: currentFields,
    });
  };
  return <Button onClick={handleSubmitByRole}>submit</Button>;
};
