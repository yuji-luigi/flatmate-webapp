import { FormFieldInterface, FormTypes, LinkChildrenFormFieldType } from './formField-types';

export type CellTypes = 'link-children' | 'avatar' | FormTypes;

export type PartialCellTypes = Partial<Record<CellTypes, LinkChildrenCellFunc | RegularCellFunc>>;

type LinkChildrenCellFunc = ({
  cellConfig,
  rowData,
  cellValue,
}: {
  cellConfig: LinkChildrenFormFieldType;
  rowData: any;
  cellValue: string;
}) => JSX.Element;

type RegularCellFunc = ({
  cellValue,
  rowData,
  cellConfig,
}: {
  cellConfig: any;
  rowData: any;
  cellValue: string;
}) => JSX.Element;
