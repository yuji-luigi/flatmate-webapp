import { UseFormReturnTypeCustom } from "../../../input_interfaces/useForm_interface";
import { StaticSelectFormFieldType } from "../../../../../types/general/data/data-table/form-field-type/formField-types";
import CrudSelect from "../CrudSelect";

interface Prop {
  formField: StaticSelectFormFieldType;
  form: UseFormReturnTypeCustom;
}
const StaticSelectOptionHandler = ({ formField, form, ...others }: Prop) => {
  const { options } = formField;
  return <CrudSelect formField={formField} form={form} options={options} />;
};

export default StaticSelectOptionHandler;
