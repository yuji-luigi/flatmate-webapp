import { BaseFormType } from '../../../src/types/general/data/data-table/form-field-type/base-form-type';
import { FormFieldTypes } from '../../../src/types/general/data/data-table/form-field-type/formField-types';

export const rolesTableData: Array<FormFieldTypes> = [
  {
    id: 'name',
    name: 'name',
    label: 'Nome',
    placeholder: 'Name of the role',
    type: 'text',
    required: true,
    priority: 1,
  },
];
