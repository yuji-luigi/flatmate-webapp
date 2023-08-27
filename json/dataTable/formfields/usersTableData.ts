import { FormFieldTypes } from '../../../src/types/general/data/data-table/formField-types';

export const usersTableData: Array<FormFieldTypes> = [
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
    id: 'surname',
    name: 'surname',
    label: 'Cognome',
    type: 'text',
    required: false,
    priority: 2,
  },
  {
    id: 'active',
    name: 'active',
    label: 'Active',
    type: 'boolean',
    cellType: 'boolean',
    required: false,
    priority: 2,
  },
  {
    id: 'role',
    name: 'role',
    label: 'Ruolo',
    type: 'static-select',
    options: [{ label: 'admin', value: 'admin' }, 'user'],
    // options: [{ value: 'static-slect-value', label: 'static-label' }],
    grantTo: ['super_admin', 'admin'],
    required: true,
    priority: 3,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'text',
    required: true,
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
  {
    id: 'rootSpaces',
    name: 'rootSpaces',
    label: 'Buildings',
    type: 'select',
    _entity: 'spaces',
    query: { isMain: true },
    selectValues: ['name'],
    grantTo: ['super_admin', 'admin'],

    multi: true,
    required: false,

    priority: 100,
  },
  // {
  //   id: 'organization',
  //   name: 'organization',
  //   label: 'Organizations',
  //   type: 'select',
  //   _entity: 'organizations',
  //   selectValues: ['name'],
  //   grantTo: ['super_admin'],
  //   required: false,
  //   priority: 100,
  // },
];
