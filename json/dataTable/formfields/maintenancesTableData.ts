import { MAINTAINER_TYPES, MAINTAINER_TYPES_ARRAY } from '../../../src/lib/enums';
import { FormFieldTypes } from '../../../src/types/general/data/data-table/formField-types';

export const maintenancesTableData: Array<FormFieldTypes> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title of the maintenance',
    type: 'text',
    required: true,
    priority: 0,
  },
  {
    id: 'description',
    name: 'description',
    label: 'Description of the maintenance',
    type: 'text',
    required: false,
    priority: 0,
  },
  {
    id: 'images',
    name: 'images',
    label: 'Tipo',
    type: 'image',
    required: false,
    priority: 0,
  },
  {
    id: 'attachments',
    name: 'attachments',
    label: 'Files',
    type: 'attachment',
    required: false,
    priority: 0,
  },

  {
    id: 'type',
    name: 'type',
    label: 'Type of maintenance',
    type: 'static-select',

    options: [...MAINTAINER_TYPES_ARRAY],
    // _entity: 'maintenances',
    // selectValues: ['name'],
    required: false,
    priority: 0,
  },
  // {
  //   id: 'tags',
  //   name: 'tags',
  //   label: 'Tag',
  //   type: 'text',
  //   required: false,
  //   priority: 0,
  // },
];
