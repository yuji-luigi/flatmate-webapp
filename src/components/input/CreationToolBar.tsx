import { Group, Stack } from "@mantine/core";
import React, { ReactNode } from "react";

import CreationToolBarIconButton from "./CreationToolBarIconButton";
import PreviewFileZone from "./PreviewFileZone";
import { UseFormReturnTypeCustom } from "./input_interfaces/useForm_interface";
import {
  FormFieldTypes,
  UploadFormFieldType,
} from "../../types/general/data/data-table/form-field-type/formField-types";
import { Entity, FrontendEntity } from "../../types/redux/CrudSliceInterfaces";

interface Props {
  form: UseFormReturnTypeCustom;
  formFields: FormFieldTypes[];
  submitButton?: ReactNode;
  /**
   *  need to pass down from drawer.
   * because there is a case that I am using override entity
   */
  entity: FrontendEntity;
}
function CreationToolBar({ form, formFields, submitButton, entity }: Props) {
  const uploadFormFields = formFields.filter(
    (field) => field.type === "image" || field.type === "attachment"
  ) as UploadFormFieldType[];
  //TODO: need to iterate over the formFields and create a upload icon for each one
  return (
    <Stack style={{ width: "100%" }}>
      {uploadFormFields?.map((uploadField) => (
        <PreviewFileZone entity={entity} key={uploadField.id} formField={uploadField} form={form} />
      ))}
      <Group
        mt={10}
        justify="right"
        // style={(theme) => ({
        //   background-color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
        // })}
      >
        {uploadFormFields?.map((uploadField) => (
          <CreationToolBarIconButton key={uploadField.id} formField={uploadField} form={form} />
        ))}
        {submitButton}
      </Group>
    </Stack>
  );
}

export default CreationToolBar;
