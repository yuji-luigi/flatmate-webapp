import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const maintainersTableData: Array<
  FormFieldTypes & { registerStep: "company" | "contact" | "complete" }
> = [
  // company info
  {
    id: "name",
    name: "name",
    label: "Nome",
    placeholder: "First name",
    type: "text",
    required: true,
    registerStep: "company",
    priority: 1,
  },
  {
    id: "company",
    name: "company",
    label: "Company",
    placeholder: "First name",
    type: "text",
    required: true,
    priority: 1,
    registerStep: "company",
  },
  {
    id: "homepage",
    name: "homepage",
    label: "Website",
    type: "text",
    required: false,
    priority: 2,
    registerStep: "company",
  },
  {
    id: "address",
    name: "address",
    label: "Address",
    type: "text",
    required: false,
    priority: 5,
    registerStep: "company",
  },
  {
    id: "type",
    name: "type",
    label: "Type of maintainer",
    type: "static-select",
    options: ["Plumber", "Electrician", "Carpenter", "Other"],
    required: true,
    priority: 3,
    registerStep: "company",
  },
  {
    id: "description",
    name: "description",
    label: "Description",
    type: "text-area",
    autosize: true,
    minRows: 5,
    col: {
      xs: 12,
      sm: 12,
      md: 12,
      lg: 12,
    },
    required: false,
    priority: 5,
    registerStep: "company",
  },
  // contact
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    priority: 2,
    registerStep: "contact",
  },
  {
    id: "tel",
    name: "tel",
    label: "Phone",
    type: "text",
    required: false,
    priority: 2,
    registerStep: "contact",
  },

  // {
  //   id: 'isIndividual',
  //   name: 'isIndividual',
  //   label: 'You are an individual?(Has own company/partita iva)',
  //   type: 'checkbox',
  //   required: false,
  //   priority: 6,
  // },

  // {
  //   id: 'cover',
  //   name: 'cover',
  //   label: 'Cover',
  //   type: 'image',
  //   multi: true,
  //   // type: 'dropzone',
  //   accept: 'image/*',
  //   selectValues: ['name'],
  //   required: false,
  //   priority: 2,
  // },

  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    priority: 3,
    registerStep: "complete",
  },
  {
    id: "consensus",
    name: "consensus",
    label: "Agree to terms",
    type: "checkbox-group-boolean",
    options: [
      {
        label: "I agree to the terms and conditions",
        name: "consensus",
      },
      {
        label: "I agree to the terms and conditions",
        name: "cons2",
      },
    ],
    required: true,
    priority: 11,
    registerStep: "complete",
  },
];