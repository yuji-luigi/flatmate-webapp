import {
  PasswordInputProps,
  SelectItem,
  SelectProps,
  StyleProp,
  TextInputProps,
  TextareaProps,
} from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';
import { Sections } from '../../sections-type';
import { UserRoles } from '../../../../../lib/enums';

type StaticOption = SelectItem & {
  icon?: (props?: TablerIconsProps) => JSX.Element;
};

type BaseFormType = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: FormTypes;
  formType?: FormTypes; // ! todo set the actual types necessary.
  cellType?: CellTypes;
  cellConfig?: CellConfig;
  multi?: boolean;
  col?: Partial<Col>;
  textSearch?: boolean;
  priority?: number;
  formOrder?: number | false;
  grantTo?: UserRoles[];
  noTable?: boolean;
  disabled?: boolean;
  align?: 'left' | 'center' | 'right';
  badge?: boolean;
  icon?: React.ReactNode;
};
type CellTypes = 'text-on-hover' | 'text-on-dialog' | 'link-children';
type CellConfig = { style: React.CSSProperties };

export type TextFormType = {
  type: 'text' | 'number' | 'boolean';
  cellType?: 'text-on-hover' | 'text-on-dialog';
} & BaseFormType &
  TextInputProps;

export type PasswordFormType = { type: 'password' } & BaseFormType & PasswordInputProps;

type BaseSelectFormType = {
  filterSearch?: boolean;
  inputOptions?: {
    useCachedData?: boolean;
  };
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
  _entity?: '';
  options: StaticOption[];
} & BaseFormType &
  BaseSelectFormType;

export type CheckBoxFormFieldType = {
  type: 'checkbox';
  // options: Array<SelectItem>;
  filterSearch?: boolean;
} & BaseFormType;

export type CheckBoxGroupBooleanFormFieldType = {
  type: 'checkbox-group-boolean';
  options: { label: string; name: string; placeholder?: string }[];
  filterSearch?: boolean;
} & BaseFormType;

export type CheckBoxGroupSelectFormFieldType = {
  type: 'checkbox-group-select';
  options: Array<SelectItem>;
  filterSearch?: boolean;
} & BaseFormType;

export type LinkChildrenFormFieldType = {
  type: 'link-children';
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
  accept?: 'image/*' | 'application/pdf' | string;
} & BaseFormType;

export type UserRoleInput = {
  type: 'user-role';
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

export type CustomFormFieldType = {
  type: 'custom';
  component: React.FC<any>;
} & BaseFormType;
export type DateFormFieldType = {
  type: 'date';
} & BaseFormType;
export type UserNameEmailCellType = {
  type: 'user-name-email-head';
} & BaseFormType;

export type FormFieldTypes =
  | TextFormType
  | SelectFormType
  | StaticSelectFormFieldType
  | CheckBoxFormFieldType
  | CheckBoxGroupBooleanFormFieldType
  | CheckBoxGroupSelectFormFieldType
  | TextAreaFormFieldType
  | RadioGroupFormFieldType
  | AvatarFormFieldType
  | ColorFormFieldType
  | LinkChildrenFormFieldType
  | CustomFormFieldType
  | PasswordFormType
  | DateFormFieldType
  | UserRoleInput
  | UserNameEmailCellType
  | UploadFormFieldType;

//deprecate this
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
  options?: Array<SelectItem>;
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

type FormTypes =
  | 'text'
  | 'text-area'
  | 'text-on-hover'
  | 'link-children'
  | 'text-on-dialog'
  | 'password'
  | 'checkbox'
  | 'checkbox-group-boolean'
  | 'checkbox-group-select'
  | 'boolean'
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
  | 'custom'
  | 'boolean'
  | 'user-role'
  | 'user-name-email-head'
  | 'pin-input';
