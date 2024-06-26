import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const fundRuleTableData: Array<FormFieldTypes> = [
  {
    id: "executeCondition",
    name: "executeCondition",
    label: "executeCondition",
    placeholder: "executeCondition of the comment",
    type: "static-select",
    options: [
      { value: "every", label: "every" },
      { value: "majority", label: "majority" },
    ],
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
    id: "space",
    name: "space",
    label: "space",
    type: "select",
    _entity: "spaces",
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
