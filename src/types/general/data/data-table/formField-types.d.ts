import { SelectProps, TextInputProps, TextareaProps } from '@mantine/core';

type BaseFormType = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: FormTypes;
  cellType?: CellTypes;
  multi?: boolean;
  col?: Col;
  textSearch?: boolean;
  priority?: number;
  badge?: boolean;
  grantTo?: UserRoles[];
  noTable?: boolean;
};

export type TextFormType = { type: 'text' | 'number' } & BaseFormType & TextInputProps;

type BaseSelectFormType = {
  filterSearch?: boolean;
} & Omit<SelectProps, 'data'>; // omit data property from SelectProps

export type SelectFormType = {
  type: 'select';
  _entity: Sections;
  selectValues: Array<string>;
  /** query when fetch select options from server   */
  query?: Record<string, string | number | boolean>;
} & BaseFormType &
  BaseSelectFormType &
  Omit<SelectProps, 'data'>;

export type StaticSelectFormFieldType = {
  type: 'static-select';
  options: Array<SelectOption | string>;
} & BaseFormType &
  BaseSelectFormType;

export type CheckBoxFormFieldType = {
  type: 'checkbox-group';
  options: Array<SelectOption | string>;
  filterSearch?: boolean;
} & BaseFormType;

export type LinkChildrenFormFieldType = {
  type: 'text';
  cellType: 'link-children';
  linkRoot: string;
  linkKey: string;
} & BaseFormType;

export type TextAreaFormFieldType = {
  type: 'text-area';
} & BaseFormType &
  TextareaProps;

export type UploadFormFieldType = {
  type: 'image' | 'attachment';
  accept?: 'image/*' | 'application/pdf' | null | string | undefined;
} & BaseFormType;

export type RadioGroupFormFieldType = {
  type: 'radio-group';
} & BaseFormType;

export type AvatarFormFieldType = {
  type: 'avatar';
} & BaseFormType;
export type ColorFormFieldType = {
  type: 'color';
} & BaseFormType;

export type FormFieldTypes =
  | TextFormType
  | SelectFormType
  | StaticSelectFormFieldType
  | CheckBoxFormFieldType
  | TextAreaFormFieldType
  | RadioGroupFormFieldType
  | AvatarFormFieldType
  | ColorFormFieldType
  | UploadFormFieldType;

export interface FormFieldInterface {
  /**
   * id and name of the field.
   *  Dot(.) is not allowed.
   * If the input value will be set to nested property of the object, use name property to use dot(.)
   *
   * example
   * id: 'user-address-city'
   *  name: 'user.address.city'
   */
  id: string;
  /** Set the property in case of nested field.
   * See id property */
  name: string;
  label: string;
  placeholder?: string;

  type: FormTypes;

  /**
   *  type refers to form type. this cellType specifically
   * refers to how to display in the dataTable
   * */
  cellType?: 'link-children';
  /** determines link root, then set the linkKey path after*/
  linkRoot?: string;
  linkKey?: string;
  /**For type select */
  multi?: boolean;
  /**For type select for editing reason put under score meaning field in formField config json(object)*/
  _entity?: Sections;
  accept?: string;
  query?: Record<string, string | number | boolean>;
  /**
   * from object. get the property [selectValue[0]] [selectValue[1]]... To show on the DataTable.
   */
  // style: Array<CellStyles>;
  badge?: boolean;
  selectValues?: Array<string>;
  /** Type select. static options*/
  options?: Array<SelectOption | string>;
  /**
   * Hide the input from the form but still send the data
   * inside formData. -> noForm is opposite
   */
  hideFromForm?: boolean;
  /** No table cell */
  noTable?: boolean;
  /** No form, no data will be sent. */
  noForm?: boolean;
  /**
   * Only users who has specified role can fill the field.
   */
  grantTo?: Array<string>;
  required?: boolean;
  /** when defined: show the defaultValue on the dataTable.
   */
  priority?: number;

  /**
   * determines in which formField(table column) can be found the dropzone's file url
   * since this current field doesn't have the file url. it should be string or string[]
   * */
  preview?: string;
  col?: Col;
}

// interface FileFormType  {
//   type: 'image' | 'attachment';
//   accept: 'image/*' | 'application/pdf' | null | undefined;
// };

interface SelectOption extends React.ComponentPropsWithoutRef<'div'> {
  /** both must be string or null */
  value: string | number | boolean;
  label: string;
}
type Col = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
};
type CellTypes = 'link-children';

type FormTypes =
  | 'text'
  | 'text-area'
  | 'password'
  | 'checkbox-group'
  | 'radio-group'
  | 'switch-group'
  | 'select'
  | 'static-select'
  | 'number'
  | 'currency'
  | 'avatar'
  | 'date'
  | 'date-range'
  | 'attachment'
  | 'image'
  | 'color'
  | 'pin-input';
