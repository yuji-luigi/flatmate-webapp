import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const areaTableData: Array<FormFieldTypes> = [
  {
    id: "name",
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    priority: 0,
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "text",
    required: false,
    priority: 0,
  },
  {
    id: "building",
    name: "building",
    label: "Owner",
    type: "select",
    _entity: "buildings",
    selectValues: ["ragioneSociale"],
    grantTo: ["super_admin"],
    required: false,
    priority: 100,
  },
  {
    id: "organization",
    name: "organization",
    label: "Organizations",
    type: "select",
    _entity: "organizations",
    selectValues: ["ragioneSociale"],
    grantTo: ["super_admin"],
    required: false,
    priority: 100,
  },
];
