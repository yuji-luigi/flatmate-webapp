import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const notificationsTableData: Array<FormFieldTypes> = [
  {
    id: "title",
    name: "title",
    label: "Title",
    type: "text",
    required: false,
    priority: 100,
  },
  {
    id: "body",
    name: "body",
    label: "Message",
    type: "text",
    required: true,
    priority: 100,
  },
];
