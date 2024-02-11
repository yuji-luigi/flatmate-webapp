import { FormFieldTypes } from '../../../src/types/general/data/data-table/form-field-type/formField-types';

export const billingsTableData: Array<FormFieldTypes> = [
  // {
  //   id: 'amount',
  //   name: 'amount',
  //   label: 'Amount',
  //   type: 'currency',
  //   required: true,
  //   priority: 4,
  // },
  // {
  //   id: 'to',
  //   name: 'to',
  //   label: 'To',
  //   type: 'select',
  //   _entity: 'users',
  //   required: false,
  //   priority: 5,
  // },
  {
    id: 'organization',
    name: 'organization',
    label: 'Organizations',
    type: 'select',
    _entity: 'organizations',
    selectValues: ['ragioneSociale'],
    grantTo: ['super_admin'],
    required: false,
    priority: 100,
  },
];
