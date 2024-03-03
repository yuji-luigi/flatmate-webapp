import { TextInput, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IInitialValues } from './defaultValues';

const Roles = [
  { label: 'User/Inhabitant', value: 'Inhabitant' },
  { label: 'Maintainer', value: 'Maintainer' },
  { label: 'Administrator', value: 'Administrator' },
];

const SignUpStepTwo = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  return (
    <>
      <Select
        data={Roles}
        name="role"
        label="Register as"
        size="md"
        mt={10}
        required
        {...form.getInputProps('role')}
      />{' '}
      <>
        {form.values.role && form.values.role !== 'Maintainer' && (
          <>
            <TextInput
              required
              label="Name of the building"
              name="space.name"
              placeholder="Via Roma 3/d, Condominio <La Perla>"
              {...form.getInputProps('space.name')}
            />
            <TextInput
              required
              label="address of the building"
              name="space.address"
              placeholder="gold street 3, 20888"
              {...form.getInputProps('space.address')}
            />
            <TextInput
              required
              label="Set password for the building"
              name="space.password"
              placeholder="secret777"
              {...form.getInputProps('space.password')}
            />
          </>
        )}
      </>
    </>
  );
};

export default SignUpStepTwo;
