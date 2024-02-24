import { FormFieldTypes } from '../../../src/types/general/data/data-table/form-field-type/formField-types';

export const usersTableData: Array<FormFieldTypes> = [
  {
    id: 'role',
    name: 'accessControllers',
    label: 'Ruolo',
    type: 'access-controller',
    noTable: true,
    required: true,
    priority: 0,
  },
  {
    id: 'user-name-email-head',
    name: 'name',
    label: 'User',
    placeholder: 'First name',
    type: 'user-name-email-head',
    required: true,
    cellConfig: {
      style: {
        width: '350px',
      },
    },
    priority: 1,
  },
  {
    id: 'name',
    name: 'name',
    label: 'Nome',
    placeholder: 'First name',
    type: 'text',
    required: true,
    noTable: true,
    priority: 1,
  },
  {
    id: 'surname',
    name: 'surname',
    label: 'Cognome',
    type: 'text',
    required: false,
    noTable: true,

    priority: 2,
  },
  {
    id: 'active',
    name: 'active',
    label: 'Active',
    type: 'boolean',
    required: false,
    priority: 2,
  },

  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
    noTable: true,

    priority: 4,
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Telefono',
    type: 'text',
    required: false,
    priority: 5,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password',
    type: 'password',
    required: true,
    noTable: true,
    priority: 6,
  },
];
