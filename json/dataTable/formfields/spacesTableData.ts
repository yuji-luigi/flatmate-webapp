import { PATH_DASHBOARD } from '../../../src/path/page-paths';
import { FormFieldTypes } from '../../../src/types/general/data/data-table/formField-types';

export const spacesTableData: Array<FormFieldTypes> = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    placeholder: 'Building East/Quarto oggiaro district(whole city as building)',
    type: 'text',
    cellType: 'link-children',
    linkRoot: PATH_DASHBOARD.childrenSpace,
    linkKey: '_id',
    required: true,
    priority: 1,
  },
  {
    id: 'address',
    name: 'address',
    label: 'address',
    placeholder: 'Golden street 334',
    type: 'text',
    required: true,
    priority: 1,
  },

  {
    id: 'password',
    name: 'password',
    label: 'password',
    type: 'text',
    // multi: true,
    required: false,
    priority: 2,
  },

  {
    id: 'admins',
    name: 'admins',
    label: 'Admins',
    type: 'select',
    _entity: 'users',
    badge: true,
    multi: true,
    selectValues: ['name', 'email'],
    grantTo: ['super_admin'],
    required: false,
    priority: 100,
  },
  {
    id: 'organization',
    name: 'organization',
    label: 'Organization',
    type: 'select',
    _entity: 'organizations',
    selectValues: ['name', 'email'],
    grantTo: ['super_admin'],
    required: false,
    priority: 100,
  },
  {
    id: 'isTail',
    name: 'isTail',
    label: 'Tip of the space?',
    placeholder: 'Golden street 334',
    type: 'radio-group',
    required: true,
    priority: 1,
  },
  {
    id: 'isMain',
    name: 'isMain',
    label: 'Main space?',
    type: 'radio-group',
    required: true,
    priority: 1,
  },
];
