import { Box, MultiSelect, Select, Text } from '@mantine/core';
import React from 'react';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import {
  SelectFormType,
  StaticSelectFormFieldType,
  UserRoleInput,
} from '../../../types/general/data/data-table/formField-types';
import { useGetSelectOptions } from '../../../../hooks/form-related/useGetSelectOptions';
import CrudSelectMulti from './CrudSelectMulti';
import { rolesTableData } from '../../../../json/dataTable/formfields/roleTableData';
import FormFields from '../FormFields';
import { useLocale } from '../../../../hooks/useLocale';

interface Prop {
  formField: UserRoleInput;
  form: UseFormReturnTypeCustom;
}
const UserRoleInput = ({ formField, form, ...others }: Prop) => {
  // return (
  //   <>
  //     {rolesTableData.map((roleFormField) => (
  //       <Text key={roleFormField.id}>{roleFormField.name}</Text>
  //     ))}
  //   </>
  // );
  const { t } = useLocale();
  return (
    <>
      <Box
        style={{
          paddingLeft: 40,
          paddingTop: 32,
        }}
      >
        <Text>{t('Inhabitant')}</Text>
        {rolesTableData.map((roleFormField) => (
          <FormFields key={roleFormField.id} formField={roleFormField} form={form} {...others} />
        ))}
      </Box>
      <Box
        style={{
          paddingLeft: 40,
          paddingTop: 32,
        }}
      >
        <Text>{t('Administrator')}</Text>
        {rolesTableData.map((roleFormField) => (
          <FormFields key={roleFormField.id} formField={roleFormField} form={form} {...others} />
        ))}
      </Box>
      <Box
        style={{
          paddingLeft: 40,
          paddingTop: 32,
        }}
      >
        <Text>{t('Maintainer')}</Text>
        {rolesTableData.map((roleFormField) => (
          <FormFields key={roleFormField.id} formField={roleFormField} form={form} {...others} />
        ))}
      </Box>
    </>
  );
};

export default UserRoleInput;
