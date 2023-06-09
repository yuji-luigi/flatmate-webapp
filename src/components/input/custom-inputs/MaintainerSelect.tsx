import { Select, SelectItem, Skeleton } from '@mantine/core';
import React from 'react';
import useSWR from 'swr';
import { CustomFormFieldType } from '../../../types/general/data/data-table/formField-types';
import { UseFormReturnTypeCustom } from '../input_interfaces/useForm_interface';
import axiosInstance, { AxiosResDataGeneric } from '../../../utils/axios-instance';
import { PATH_API } from '../../../path/api-routes';
import { useCookieContext } from '../../../context/CookieContext';
import { MaintainerModel } from '../../../types/models/maintainer-model';

interface Props {
  formField: CustomFormFieldType;
  form: UseFormReturnTypeCustom;
}
const fetchMaintainersOfBuilding = async (/* buildingId: string */) => {
  try {
    const res = await axiosInstance.get<AxiosResDataGeneric<MaintainerModel[]>>(
      `${PATH_API.maintainersSpace}`
    );
    return res.data.data.map((maintainer) => ({
      value: maintainer._id,
      label: `${maintainer.type.toUpperCase()}: ${maintainer.name} - ${maintainer.email}`,
    }));
  } catch (error) {
    throw error;
  }
};
export const MaintainerSelect = ({ formField, form, ...others }: Props) => {
  const { currentSpace } = useCookieContext();
  const { data, isLoading } = useSWR(['maintainers', currentSpace?._id], () =>
    fetchMaintainersOfBuilding()
  );
  if (isLoading || !data) return <Skeleton height={50} />;
  return (
    <Select
      searchable
      data={data || []}
      name={formField.name}
      label={formField.label}
      placeholder={formField.placeholder}
      size="md"
      mt={10}
      {...others}
      {...form.getInputProps(formField.name || formField.id)}
    />
  );
};
