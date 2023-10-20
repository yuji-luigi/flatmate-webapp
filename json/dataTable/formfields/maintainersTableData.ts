import { FormFieldTypes } from '../../../src/types/general/data/data-table/formField-types';

export const maintainersTableData: Array<FormFieldTypes> = [
  {
    id: 'name',
    name: 'name',
    label: 'Nome',
    placeholder: 'First name',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'company',
    name: 'company',
    label: 'Company',
    placeholder: 'First name',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'homepage',
    name: 'homepage',
    label: 'Website',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    priority: 2,
  },
  {
    id: 'tel',
    name: 'tel',
    label: 'Phone',
    type: 'text',
    required: true,
    priority: 2,
  },
  {
    id: 'type',
    name: 'type',
    label: 'Type of maintainer',
    type: 'static-select',
    options: ['Plumber', 'Electrician', 'Carpenter', 'Other'],
    required: true,
    priority: 3,
  },
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
    id: 'description',
    name: 'description',
    label: 'Description',
    type: 'text',
    required: false,
    priority: 5,
  },

  {
    id: 'address',
    name: 'address',
    label: 'Address',
    type: 'text',
    required: false,
    priority: 5,
  },
  {
    id: 'isIndividual',
    name: 'isIndividual',
    label: 'Is individual',
    type: 'checkbox-group',
    options: [
      { label: 'Yes', value: 'true' },
      { label: 'No', value: 'false' },
    ],
    required: false,
    priority: 6,
  },
];
