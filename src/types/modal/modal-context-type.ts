import { ModalProps, Sx } from '@mantine/core';
import { OpenConfirmModalParams } from '../../context/modal-context/ModalRootCustom';
import { FormFieldTypes } from '../general/data/data-table/formField-types';
import { AllModels } from '../models/allmodels';

export interface _ModalContextStates {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  modals: ModalProps;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: OpenConfirmModalParams) => void;
}

export type BaseModalParams = {
  title: string;
  centered?: boolean;
  children: React.ReactNode;
  fullScreen?: boolean;
  onCancel?: () => void;
  onConfirm: (data: any) => void | Promise<void>;
};

export interface ConfirmAlertModalParams extends BaseModalParams {
  type: 'confirm' | 'alert';
  formFields?: FormFieldTypes[];
  sx?: {
    confirm?: Sx;
    cancel?: Sx;
  };
  labels: {
    confirm?: string;
    cancel?: string;
  };
}

export interface CrudModalParams extends BaseModalParams {
  type: 'crud';
  formFields: FormFieldTypes[];
  crudDocument: AllModels;
}
export interface CustomModalParams extends BaseModalParams {
  type: 'custom';
  withinPortal?: boolean;
}

export type OpenConfirmModalParams = ConfirmAlertModalParams | CrudModalParams | CustomModalParams;

export type ModalProps = OpenConfirmModalParams & {
  id: string;
  fullScreen?: boolean;
  labels: {
    confirm?: string;
    cancel?: string;
  };
  sx: {
    confirm?: Sx;
    cancel?: Sx;
  };
};
