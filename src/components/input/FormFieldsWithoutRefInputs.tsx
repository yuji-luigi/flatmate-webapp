import { UseFormReturnType } from "@mantine/form";

import CrudTextInput from "./crud-inputs/CrudTextInput";
import CrudTextArea from "./crud-inputs/CrudTextArea";
import CrudSelectMulti from "./crud-inputs/select-inputs/CrudSelectMulti";
import CrudSelect from "./crud-inputs/select-inputs/CrudSelect";

import { FormFieldTypes } from "../../types/general/data/data-table/form-field-type/formField-types";
import CrudPasswordInput from "./crud-inputs/CrudTextInput copy";
import CrudCheckbox from "./crud-inputs/CrudCheckbox";
import { CrudSelectCheckboxGroup } from "./crud-inputs/select-inputs/CrudSelectCheckboxGroup";
import { CrudBooleanCheckboxGroup } from "./crud-inputs/CrudBooleanCheckboxGroup";

interface Props {
  formField: FormFieldTypes;
  // initialValues: Record<string, any>;
  minRows?: number;
  form: UseFormReturnType<Record<string, unknown>>;
  disabled?: boolean;
  // submitButton?: ReactNode;
}
const FormFieldsWithoutRefInputs = ({ formField, form, ...others }: Props) => {
  const formType = formField.type;

  switch (formType) {
    case "number":
    case "text":
      return <CrudTextInput form={form} formField={formField} {...others} />;
    case "link-children":
      return <CrudTextInput form={form} formField={formField} {...others} />;
    case "password":
      return <CrudPasswordInput form={form} formField={formField} {...others} />;
    case "text-area":
      return <CrudTextArea form={form} formField={formField} {...others} />;
    case "select":
      return formField.multi ? (
        <CrudSelectMulti form={form} formField={formField} {...others} />
      ) : (
        <CrudSelect form={form} formField={formField} {...others} />
      );
    case "static-select":
      return <CrudSelect form={form} formField={formField} {...others} />;
    case "checkbox":
      return <CrudCheckbox form={form} formField={formField} {...others} />;
    case "checkbox-group-select":
      return <CrudSelectCheckboxGroup form={form} formField={formField} {...others} />;
    case "checkbox-group-boolean":
      return <CrudBooleanCheckboxGroup form={form} formField={formField} {...others} />;

    case "custom":
      // eslint-disable-next-line no-case-declarations
      const CustomComponent = formField.component;
      return (
        <>
          <CustomComponent form={form} formField={formField} {...others} />
        </>
      );

    // case 'date':
    //   return <CrudDatePicker form={form} formField={formField} {...others} />;

    // case 'boolean':
    //   return <CrudSwitch form={form} formField={formField} {...others} />;

    // case 'checkbox':
    //   return (
    //     <Checkbox
    //       checked={form.values[formField.name]}
    //       name={formField.name}
    //       label={formField.label}
    //       placeholder={formField.placeholder}
    //       size="md"
    //       mt={10}
    //       {...others}
    //       {...form.getInputProps(formField.name || formField.id)}
    //     />
    //   );
    // case 'radio-group':
    //   return <RadioGroup form={form} formField={formField} {...others} />;
    // case 'switch-group':
    //   return <SwitchGroup form={form} formField={formField} {...others} />;

    default:
      return null;
  }
};

export default FormFieldsWithoutRefInputs;
