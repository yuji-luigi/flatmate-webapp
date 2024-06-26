import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const statisticsTableData: Array<FormFieldTypes> = [
  {
    id: "avatar",
    name: "avatar",
    label: "",
    // noTable: true,
    type: "avatar",
    // required: fa,
    priority: 1,
  },
  {
    id: "name",
    name: "name",
    label: "Nome",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "job",
    name: "job",
    label: "Job title",
    type: "static-select",
    // options: ['super_admin', 'admin', 'operatore', 'supervisore', 'manutentore'],
    options: [{ value: "static-slect-value", label: "static-label" }],

    badge: true,
    required: true,
    priority: 1,
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    priority: 1,
  },
  {
    id: "surname",
    name: "surname",
    label: "Surname",
    type: "text",
    noTable: true,
    required: true,
    priority: 2,
  },
  {
    id: "phone",
    name: "phone",
    label: "Telefono",
    type: "text",
    required: false,
    priority: 1,
  },

  {
    id: "password",
    name: "password",
    label: "Password",
    type: "text",
    required: true,
    noTable: true,
    priority: 6,
  },
  {
    id: "buildings",
    name: "buildings",
    label: "Struttura",
    type: "select",
    _entity: "buildings",
    selectValues: ["name"],
    multi: true,
    required: false,
    priority: 100,
  },
  {
    id: "organization",
    name: "organization",
    label: "Organizations",
    type: "select",
    _entity: "organizations",
    selectValues: ["name"],
    grantTo: ["super_admin"],
    required: false,
    priority: 100,
  },
];
