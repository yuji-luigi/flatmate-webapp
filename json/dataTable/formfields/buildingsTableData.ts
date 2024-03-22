import { FormFieldTypes } from "../../../src/types/general/data/data-table/form-field-type/formField-types";

export const buildingTableData: Array<FormFieldTypes> = [
  {
    id: "name",
    name: "name",
    label: "Name",
    placeholder: "Building East/Quarto oggiaro district(whole city as building)",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "address",
    name: "address",
    label: "address",
    placeholder: "Golden street 334",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "areas",
    name: "areas",
    label: "areas",
    type: "select",
    multi: true,
    _entity: "areas",
    selectValues: ["name"],
    required: false,
    priority: 2,
  },
  {
    id: "password",
    name: "password",
    label: "password",
    type: "text",
    // multi: true,
    required: false,
    priority: 2,
  },

  // {
  //   id: "threads",
  //   name: "threads",
  //   label: "threads",
  //   type: "select",
  //   multi: true,
  //   _entity: "threads",
  //   selectValues: ["name"],
  //   required: false,
  //   priority: 2,
  // },
  {
    id: "fund",
    name: "fund",
    label: "funds",
    type: "select",
    multi: true,
    _entity: "funds",
    selectValues: ["name"],
    required: false,
    priority: 2,
  },
  {
    id: "organization",
    name: "organization",
    label: "Organizations",
    type: "select",
    _entity: "organizations",
    selectValues: ["name", "email"],
    grantTo: ["super_admin"],
    required: false,
    priority: 100,
  },
];
