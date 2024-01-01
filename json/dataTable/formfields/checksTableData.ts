import { FormFieldTypes } from '../../../src/types/general/data/data-table/formField-types';

export const checksTableData: Array<FormFieldTypes> = [
  {
    id: 'subtotal',
    name: 'subtotal',
    label: 'Subtotal',
    placeholder: 'Subtotal',
    type: 'number',
    required: true,
    priority: 1,
  },
  {
    id: 'total',
    name: 'total',
    label: 'Total',
    placeholder: 'Total',
    type: 'number',
    required: true,
    priority: 1,
  },
  {
    id: 'description',
    name: 'description',
    label: 'description',
    type: 'text-area',
    minRows: 5,
    maxRows: 10,
    required: false,
    priority: 2,
  },
];
