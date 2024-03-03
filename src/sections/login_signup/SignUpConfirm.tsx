import { UseFormReturnType } from '@mantine/form';
import { IInitialValues } from './defaultValues';
import SimpleRow from '../../components/list/SimpleRow';

const SignUpStepTwo = ({ form }: { form: UseFormReturnType<IInitialValues> }) => {
  return (
    <>
      <SimpleRow title="name" content={form.values.name} top />
      <SimpleRow title="surname" content={form.values.surname} />
      <SimpleRow title="email" content={form.values.email} />
      <SimpleRow title="you are" content={form.values.role} />
      <SimpleRow title="password" content="****" />
      {form.values.role !== 'Maintainer' && (
        <>
          <SimpleRow title="Name of the place" content={form.values.space.name} />
          <SimpleRow title="Address of the place" content={form.values.space.address} />
          <SimpleRow title="Password of building" content={form.values.space.password} />
        </>
      )}
    </>
  );
};

export default SignUpStepTwo;
