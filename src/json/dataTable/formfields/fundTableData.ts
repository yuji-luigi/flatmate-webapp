import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const fundTableData: Array<FormFieldTypes> = [
  {
    id: "amount",
    name: "amount",
    label: "amount",
    placeholder: "amount of the comment",
    type: "number",
    required: true,
    priority: 1,
  },
  {
    id: "fundRules",
    name: "fundRules",
    label: "fundRules",
    placeholder: "fundRules",
    type: "number",
    required: true,
    priority: 1,
  },
  {
    id: "building",
    name: "building",
    label: "Building",
    type: "select",
    _entity: "buildings",
    selectValues: ["name"],
    required: false,
    priority: 2,
  },
  {
    id: "user",
    name: "user",
    label: "created by",
    type: "select",
    _entity: "users",
    selectValues: ["name"],
    required: false,
    priority: 2,
  },
];
