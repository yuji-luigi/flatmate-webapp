import { UserRoles } from "../../../../../lib/enums";

export type BaseFormType = {
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
  align?: "left" | "center" | "right";
  badge?: boolean;
  icon?: React.ReactNode;
};

type CellTypes = "text-on-hover" | "text-on-dialog" | "link-children";

type CellConfig = { style: React.CSSProperties };

type Col = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
};

export type FormTypes =
  | "text"
  | "text-area"
  | "text-on-hover"
  | "link-children"
  | "text-on-dialog"
  | "password"
  | "checkbox"
  | "checkbox-group-boolean"
  | "checkbox-group-select"
  | "boolean"
  | "radio-group"
  | "switch-group"
  | "select"
  | "static-select"
  | "number"
  | "currency"
  | "avatar"
  | "date"
  | "date-range"
  | "attachment"
  | "image"
  | "color"
  | "custom"
  | "boolean"
  | "user-role"
  | "user-name-email-head"
  | "access-controller"
  | "space-auto-select"
  | "geo-api"
  | "pin-input";
