import { MaintainerSelect } from '../../../src/components/input/custom-inputs/MaintainerSelect';
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
    type: 'text-area',
    cellType: 'text-on-dialog',
    minRows: 5,
    required: false,
    priority: 0,
  },
  // {
  //   id: 'images',
  //   name: 'images',
  //   label: 'Tipo',
  //   type: 'image',
  //   multi: true,
  //   required: false,
  //   priority: 0,
  // },
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
  {
    id: 'maintainer',
    name: 'maintainer',
    label: 'Maintainer',
    type: 'custom',
    required: true,
    component: MaintainerSelect,
    priority: 0,
  },
];
