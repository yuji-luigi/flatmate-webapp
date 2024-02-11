import { FormFieldTypes } from '../../../src/types/general/data/data-table/form-field-type/formField-types';

export const threadTableData: Array<FormFieldTypes> = [
  {
    id: 'title',
    name: 'title',
    label: 'Title',
    placeholder: 'Have you ever seen...?',
    type: 'text',
    required: true,
    priority: 1,
  },
  {
    id: 'description',
    name: 'description',
    label: 'body',
    placeholder: 'Have you ever seen the cat with 6 colors?...',
    type: 'text-area',
    autosize: true,
    maxRows: 20,
    minRows: 10,
    required: true,
    priority: 1,
  },
  // {
  //   id: 'tags',
  //   name: 'tags',
  //   label: 'tag',
  //   placeholder: 'Tag',
  //   type: 'text',
  //   required: true,
  //   priority: 1,
  // },

  {
    id: 'images',
    name: 'images',
    label: 'Photos',
    type: 'image',
    multi: true,
    // type: 'dropzone',
    accept: 'image/*',
    // selectValues: ['name'],
    required: false,
    priority: 2,
  },
  {
    id: 'attachments',
    name: 'attachments',
    multi: true,
    label: 'Attachments',
    accept: '',
    type: 'attachment',
    // selectValues: ['name'],
    required: false,
    priority: 2,
  },
  // {
  //   id: 'building',
  //   name: 'building',
  //   label: 'created by',
  //   type: 'select',
  //   multi: true,
  //   _entity: 'buildings',
  //   selectValues: ['name'],
  //   required: false,
  //   priority: 2,
  // },
  {
    id: 'isImportant',
    name: 'isImportant',
    label: 'Important',
    options: ['Important'],
    type: 'checkbox-group',
    required: false,
    priority: 2,
  },
];
