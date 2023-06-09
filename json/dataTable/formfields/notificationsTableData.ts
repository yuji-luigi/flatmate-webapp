import {
  FormFieldInterface,
  FormFieldTypes,
} from '../../../src/types/general/data/data-table/formField-types';

export const notificationsTableData: Array<FormFieldTypes> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    type: 'text',
    required: false,
    priority: 100,
  },
  {
    id: 'body',
    name: 'body',
    label: 'Message',
    type: 'text',
    required: true,
    priority: 100,
  },
];
