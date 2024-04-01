import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const userSettingTableData: Array<FormFieldTypes> = [
  {
    id: "pushNotification",
    name: "pushNotification",
    label: "pushNotification",
    placeholder: "",
    type: "radio-group",
    required: true,
    priority: 1,
  },
  {
    id: "smsNotification",
    name: "smsNotification",
    label: "smsNotification",
    placeholder: "",
    type: "radio-group",
    required: true,
    priority: 1,
  },
  {
    id: "user",
    name: "user",
    label: "created by",
    type: "select",
    multi: true,
    _entity: "users",
    selectValues: ["name"],
    required: false,
    priority: 2,
  },
];
