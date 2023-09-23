import { Sx } from '@mantine/core';
import { FormFieldTypes } from '../general/data/data-table/formField-types';
import { AllModels } from '../models/allmodels';

export type _ModalContextStates = {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: () => void;
  modals: CustomModalProps;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: OpenConfirmModalParams) => void;
} & OpenConfirmModalParams;

export type BaseModalParams = {
  title: string;
  centered?: boolean;
  children: React.ReactNode;
  fullScreen?: boolean;
  isOpenModal?: boolean;
  closeModal: () => void;
  // modals?: CustomModalProps;
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
  modals: CustomModalProps;
}
export interface CustomModalParams extends BaseModalParams {
  type: 'custom';
  withinPortal?: boolean;
}

export type OpenConfirmModalParams = ConfirmAlertModalParams | CrudModalParams | CustomModalParams;

export type CustomModalProps = OpenConfirmModalParams & {
  id: string;
  type: string;
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
