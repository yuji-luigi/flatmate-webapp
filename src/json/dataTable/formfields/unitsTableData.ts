import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const unitsTableData: Array<FormFieldTypes> = [
  // company info
  {
    id: "name",
    name: "name",
    label: "Nome",
    placeholder: "First name",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "ownerName",
    name: "ownerName",
    label: "Owner Name",
    placeholder: "First name",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "mateName",
    name: "mateName",
    label: "Mate Name",
    placeholder: "First name",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "space",
    name: "space",
    label: "Condominium",
    _entity: "spaces",
    selectValues: ["name"],
    placeholder: "First name",
    type: "select",
    required: true,
    priority: 1,
  },
];
