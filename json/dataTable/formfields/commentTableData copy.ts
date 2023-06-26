import { FormFieldInterface } from '../../../src/types/general/data/data-table/formField-types';

export const commentTableData: Array<FormFieldInterface> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    placeholder: 'Title of the comment',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'body',
    name: 'body',
    label: 'lorem ipsum...',
    placeholder: "Comment' body",
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'password',
    name: 'password',
    label: 'Password for private use',
    placeholder: 'secret_$$',
    type: 'text',
    required: false,
    priority: 1,
  },
  {
    id: 'private',
    name: 'private',
    label: 'Hide comment.',
    type: 'boolean',
    required: false,
    priority: 1,
  },
  {
    id: 'anonymous',
    name: 'anonymous',
    label: 'Hide comment.',
    type: 'boolean',
    required: false,
    priority: 1,
  },

  {
    id: 'building',
    name: 'building',
    label: 'building',
    type: 'select',
    _entity: 'buildings',
    selectValues: ['name'],
    required: true,
    priority: 2,
  },
  {
    id: 'organization',
    name: 'organization',
    label: 'Organizations',
    type: 'select',
    _entity: 'organizations',
    selectValues: ['name'],
    required: false,
    priority: 2,
  },
  {
    id: 'user',
    name: 'user',
    label: 'Created by',
    type: 'select',
    _entity: 'users',
    selectValues: ['name', 'email'],
    required: false,
    priority: 2,
  },
];
