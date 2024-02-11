import {
  PasswordInputProps,
  SelectProps,
  ComboboxItem,
  TextInputProps,
  TextareaProps,
} from '@mantine/core';
import { TablerIconsProps } from '@tabler/icons-react';
import React from 'react';
import { Sections } from '../../sections-type';

import { BaseFormType } from './base-form-type';

export type StaticOption = ComboboxItem & {
  icon?: (props?: TablerIconsProps) => JSX.Element;
};

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
  filterSearch?: boolean;
} & BaseFormType;

export type CheckBoxGroupBooleanFormFieldType = {
  type: 'checkbox-group-boolean';
  options: { label: string; name: string; placeholder?: string }[];
  filterSearch?: boolean;
} & BaseFormType;

export type CheckBoxGroupSelectFormFieldType = {
  type: 'checkbox-group-select';
  options: Array<ComboboxItem>;
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
