import { Icons } from "../../../data/icons/icons";
import { MAINTENANCE_STATUS_OPTIONS } from "../../../lib/enums";
import { FormFieldTypes } from "../../../types/general/data/data-table/form-field-type/formField-types";

export const maintenanceStatTableData: Array<FormFieldTypes> = [
  {
    id: "title",
    name: "title",
    label: "Title",
    type: "text",
  },
  {
    id: "invoiceTotal",
    name: "invoiceTotal",
    label: "Invoice total",
    type: "text",
  },
  {
    id: "receiptsTotal",
    name: "receiptsTotal",
    label: "Paid total",
    type: "text",
  },
  {
    id: "status",
    name: "status",
    label: "Status",
    type: "static-select",
    options: [...MAINTENANCE_STATUS_OPTIONS],
    badge: true,
  },
  {
    id: "completedAt",
    name: "completedAt",
    label: "Finished Date",
    type: "text",
  },
  {
    id: "completedBy",
    name: "completedBy",
    label: "Completed by",
    type: "text",
  },
  // {
  //   id: 'createdAt',
  //   name: 'createdAt',
  //   label: 'Reported',
  //   type: 'text',
  // },
  // {
  //   id: '_actions',
  //   name: '_actions',
  //   label: 'Actions',
  //   data: [
  //     { id: 'edit', name: 'edit' },
  //     { id: 'delete', name: 'delete' },
  //   ],
  // },
];
