import { Icons } from '../../../src/data/icons/icons';
import { FormFieldTypes } from '../../../src/types/general/data/data-table/formField-types';

export const maintenanceStatTableData: Array<FormFieldTypes> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    type: 'text',
  },
  {
    id: 'cost',
    name: 'cost',
    label: 'Cost',
    type: 'text',
  },
  {
    id: 'status',
    name: 'status',
    label: 'Status',
    type: 'text',
    badge: true,
  },
  {
    id: 'completedAt',
    name: 'completedAt',
    label: 'Finished Date',
    type: 'text',
  },
  {
    id: 'completedBy',
    name: 'completedBy',
    label: 'Completed by',
    type: 'text',
  },
  // {
  //   id: 'createdAt',
  //   name: 'createdAt',
  //   label: 'Reported',
  //   type: 'text',
  // },
  // {
  //   id: '_actions',
  //   name: '_actions',
  //   label: 'Actions',
  //   data: [
  //     { id: 'edit', name: 'edit' },
  //     { id: 'delete', name: 'delete' },
  //   ],
  // },
];
