import { ModalProps } from '@mantine/core';
import React from 'react';
import { FormFieldTypes } from '../general/data/data-table/form-field-type/formField-types';
import { AllModels } from '../models/allmodels';

export type _ModalContextStates = {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  modalData: ModalDataTypes;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: ModalDataTypes) => void;
};
export type ModalType = 'confirm' | 'alert' | 'crud' | 'custom';
export type BaseModalData = {
  // id?: string;
  title?: string | React.ReactNode;
  type: ModalType;
  centered?: boolean;
  fullScreen?: boolean;
  withinPortal?: boolean;
} & ModalProps;

export interface RegularModalParams extends BaseModalData {
  type: 'confirm' | 'alert';
  // formFields?: FormFieldTypes[];
  children?: React.ReactNode;
  labels?: {
    confirm?: string;
    cancel?: string;
  };
  style?: {
    confirm: React.CSSProperties;
    cancel: React.CSSProperties;
  };
  onCancel?: () => void;
  onConfirm: (data: any) => void | Promise<void>;
}

export interface CrudModalData extends BaseModalData {
  type: 'crud';
  formFields: FormFieldTypes[];
  crudDocument: AllModels;
  // onCancel: () => void;
  // onConfirm: (data: any) => void | Promise<void>;
}
export interface CustomModalData extends BaseModalData {
  type: 'custom';
  // withinPortal?: boolean;
  children: React.ReactNode;
}

export type ModalDataTypes = RegularModalParams | CrudModalData | CustomModalData;
