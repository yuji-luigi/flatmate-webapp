import { PATH_CLIENT } from "../../../src/path/path-frontend";
import { FormFieldTypes } from "../../../src/types/general/data/data-table/form-field-type/formField-types";

export const spacesTableData: Array<FormFieldTypes> = [
  {
    id: "name",
    name: "name",
    label: "Name",
    placeholder: "Building East/Quarto oggiaro district(whole city as building)",
    type: "link-children",
    formType: "text",
    cellType: "link-children",
    linkRoot: PATH_CLIENT.childrenSpace,
    linkKey: "_id",
    required: true,
    priority: 1,
  },
  {
    id: "address",
    name: "address",
    label: "address",
    placeholder: "Golden street 334",
    type: "text",
    // required: true,
    priority: 1,
  },

  {
    id: "isTail",
    name: "isTail",
    label: "Tip of the space?",
    placeholder: "Golden street 334",
    type: "radio-group",
    required: true,
    priority: 1,
  },
  {
    id: "isMain",
    name: "isMain",
    label: "Main space",
    type: "radio-group",
    required: true,
    priority: 1,
  },
];
