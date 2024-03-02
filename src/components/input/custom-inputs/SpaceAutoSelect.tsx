import { UseFormReturnType } from '@mantine/form';
import React, { useEffect } from 'react';
import { MultiSelect } from '@mantine/core';
import { SpaceSelectAuto } from '../../../types/general/data/data-table/form-field-type/formField-types';
import useAuth from '../../../../hooks/useAuth';
import { useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { SpaceModel } from '../../../types/models/space-model';
import { useCookieContext } from '../../../context/CookieContext';

type Props = {
  form: UseFormReturnType<Record<string, unknown>>;
  formField: SpaceSelectAuto;
};
export const SpaceAutoSelect = (props: Props) => {
  const { crudDocuments: spaces } = useCrudSelectors<SpaceModel>('spaces');
  const { currentSpace } = useCookieContext();
  useEffect(() => {
    const defaultValue = currentSpace?._id ? [currentSpace?._id] : [];
    props.form.setFieldValue(props.formField.name, defaultValue);
  }, [currentSpace?._id]);
  return (
    <MultiSelect
      className="crud-input"
      name="space"
      label={props.formField.label}
      clearable
      searchable
      data={spaces.map((space) => ({ value: space._id, label: space.name }))}
      {...props.form.getInputProps(props.formField.name)}
    />
  );
};
