import React from "react";
import { UnitUserInputFormField } from "../../../../types/general/data/data-table/form-field-type/formField-types";
import { UseFormReturnTypeCustom } from "../../input_interfaces/useForm_interface";
import { useFetch, useRequest } from "../../../../../hooks/useFetch";
import { UserModel } from "../../../../types/models/space-model";
import { apiEndpoint } from "../../../../path/path-api";
interface Props {
  formField: UnitUserInputFormField;
  form: UseFormReturnTypeCustom;
}
export const UnitUserInput = ({ form, formField }: Props) => {
  const userId = form.values.user as string;
  const { data, isLoading, error } = useFetch<UserModel>(apiEndpoint.users.updateById(userId));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="crud-input" data-column={4}>
      {data.name}
    </div>
  );
};
