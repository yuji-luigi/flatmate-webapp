import { UseFormReturnType } from '@mantine/form';
import React from 'react';
import { MultiSelect } from '@mantine/core';
import { SpaceSelectAuto } from '../../../types/general/data/data-table/form-field-type/formField-types';
import useAuth from '../../../../hooks/useAuth';

type Props = {
  form: UseFormReturnType<Record<string, unknown>>;
  formField: SpaceSelectAuto;
};
export const SpaceAutoSelect = (props: Props) => {
  const { user } = useAuth();

  return <MultiSelect name="space" clearable searchable data={[{}]} />;
};
