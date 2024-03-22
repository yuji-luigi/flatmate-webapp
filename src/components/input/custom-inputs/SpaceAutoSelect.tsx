import { UseFormReturnType } from "@mantine/form";
import React, { useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import { SpaceSelectAuto } from "../../../types/general/data/data-table/form-field-type/formField-types";
import useAuth from "../../../../hooks/useAuth";
import { useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import { SpaceModel } from "../../../types/models/space-model";
import { useCookieContext } from "../../../context/CookieContext";
import { useSpaceSelectionSelectors } from "../../../redux/features/crud/spaceSelectionSlice";

type Props = {
  form: UseFormReturnType<Record<string, unknown>>;
  formField: SpaceSelectAuto;
};
export const SpaceAutoSelect = (props: Props) => {
  const { form, formField } = props;
  const { spaceSelections: spaces } = useSpaceSelectionSelectors();
  const { currentSpace } = useCookieContext();
  useEffect(() => {
    if ((form.values[formField.name] as []).length) return;
    const defaultValue = currentSpace?._id ? [currentSpace?._id] : [];
    form.setFieldValue(formField.name, defaultValue);
  }, [currentSpace?._id]);
  return (
    <MultiSelect
      className="crud-input"
      name="space"
      label={formField.label}
      clearable
      searchable
      size="md"
      data={spaces.map((space) => ({ value: space._id, label: space.name }))}
      {...form.getInputProps(formField.name)}
    />
  );
};
