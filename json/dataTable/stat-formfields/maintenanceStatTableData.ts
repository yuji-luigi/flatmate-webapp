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
    id: 'invoiceTotal',
    name: 'invoiceTotal',
    label: 'Invoice total',
    type: 'text',
  },
  {
    id: 'receiptsTotal',
    name: 'receiptsTotal',
    label: 'Paid total',
    type: 'text',
  },
  {
    id: 'status',
    name: 'status',
    label: 'Status',
    type: 'static-select',
    options: [
      {
        value: 'incomplete',
        label: 'In attesa',
        icon: Icons.clockStop,
        color: 'orange',
      },
      {
        value: 'invoiced',
        label: 'In fatturazione',
        icon: Icons.clockStop,
        color: 'orange',
      },
      {
        value: 'inProgress',
        label: 'In corso',
        icon: Icons.progressCheck,
        color: 'blue',
      },
      {
        value: 'completed',
        label: 'Completato',
        icon: Icons.check,
        color: 'green',
      },
    ],
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
