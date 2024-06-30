import { MaintainerSelect } from "../../../components/input/custom-inputs/MaintainerSelect";
import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const unitsTableData: Array<FormFieldTypes> = [
  // company info
  // {
  //   id: "user",
  //   name: "user",
  //   label: "User",
  //   placeholder: "First name",
  //   type: "unit-user",
  //   required: true,
  //   priority: 1,
  // },
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
    label: "OwnerLabel",
    placeholder: "First name",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "tenantName",
    name: "tenantName",
    label: "MateLabel",
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
