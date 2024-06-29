import { ModalProps } from "@mantine/core";
import React from "react";
import { FormFieldTypes } from "../general/data/data-table/form-field-type/formField-types";
import { AllModels } from "../models/allmodels";

export type _ModalContextStates = {
  isOpenModal: boolean;
  closeModal: () => void;
  openModal: (modalProps: ModalDataTypes) => void;
  modalData: ModalDataTypes;
  toggleOpenModal: (isOpenModal: boolean) => void;
  openConfirmModal: (confirmModalProps: ModalDataTypes) => void;
};
export type ModalType = "confirm" | "alert" | "crud" | "custom" | "loading" | "headless";

export type BaseModalData = {
  // id?: string;
  title?: string | React.ReactNode;
  size?: ModalProps["size"];
  type: ModalType;
  centered?: boolean;
  fullScreen?: boolean;
  withinPortal?: boolean;
};

export interface RegularModalParams extends BaseModalData {
  type: "confirm" | "alert" | "loading";
  // formFields?: FormFieldTypes[];
  children?: React.ReactNode;
  opened: boolean;
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
  withCloseButton?: boolean;
}

export interface CrudModalData extends BaseModalData {
  type: "crud";
  formFields: FormFieldTypes[];
  crudDocument: AllModels;
}
export interface CustomModalData extends BaseModalData {
  type: "custom";
  children: React.ReactNode;
}
export interface HeadlessModalData extends BaseModalData {
  type: "headless";
  children: React.ReactNode;
}

export type ModalDataTypes =
  | RegularModalParams
  | CrudModalData
  | CustomModalData
  | HeadlessModalData;
