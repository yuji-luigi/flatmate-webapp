import { Button } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { _PATH_API } from '../../../../../path/path-api';
import axiosInstance from '../../../../../utils/axios-instance';

type SubmitAllRoleButtonProps = {
  form: UseFormReturnType<Record<string, unknown>>;
};

export const SubmitAllRoleButton: React.FC<SubmitAllRoleButtonProps> = (
  props: SubmitAllRoleButtonProps
) => {
  const { form } = props;
  const handleSubmitAllRoles: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    const rawAccessControl = await axiosInstance.post(
      _PATH_API.accessControllers.root,
      form.values
    );
    e;
  };
  return <Button onClick={handleSubmitAllRoles}>Apply all Roles</Button>;
};
