import {
  FormFieldTypes,
  FormTypes,
  LinkChildrenFormFieldType,
} from "./form-field-type/formField-types";

export type CellTypes = "link-children" | "avatar" | FormTypes;

export type PartialCellTypes = Partial<Record<CellTypes, LinkChildrenCellFunc | RegularCellFunc>>;

export type LinkChildrenCellFunc = ({
  cellConfig,
  rowData,
  cellValue,
}: {
  cellConfig: LinkChildrenFormFieldType;
  rowData: any;
  cellValue: string;
}) => JSX.Element;

export type RegularCellFunc = ({
  cellValue,
  rowData,
  cellConfig,
}: {
  cellConfig: Exclude<FormFieldTypes, LinkChildrenFormFieldType>;
  rowData: any;
  cellValue: string;
}) => JSX.Element;
