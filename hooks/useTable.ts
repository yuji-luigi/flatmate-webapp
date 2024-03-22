import { useState } from "react";
import { FormFieldTypes } from "../src/types/general/data/data-table/form-field-type/formField-types";

// ----------------------------------------------------------------------

type useTableProps = {
  // defaultDense?: boolean;
  /** default is name */
  defaultOrderBy?: string;
  defaultOrder?: "asc" | "desc";
  // defaultCurrentPage?: number;
  // defaultRowsPerPage?: number;
  // defaultSelected?: any[];
};

export default function useTable(props: useTableProps) {
  // const [dense, setDense] = useState(props?.defaultDense || false);

  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || "name");

  const [order, setOrder] = useState(props?.defaultOrder || "asc");

  // const [page, setPage] = useState(props?.defaultCurrentPage || 0);

  // const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);

  // const [selected, setSelected] = useState(props?.defaultSelected || []);

  const onSort = (id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  // const onSelectRow = (id) => {
  //   const selectedIndex = selected.indexOf(id);

  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, id);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const onSelectAllRows = (checked, newSelecteds) => {
  //   if (checked) {
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const onChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const onChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const onChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  // filter

  return {
    // dense,
    order,
    // page,
    // setPage,
    orderBy,
    // rowsPerPage,
    // //
    // selected,
    // setSelected,
    // onSelectRow,
    // onSelectAllRows,
    // //
    onSort,
    // onChangePage,
    // onChangeDense,
    // onChangeRowsPerPage,
  };
}

// ----------------------------------------------------------------------

export function descendingComparator(
  a: Record<string, string>,
  b: Record<string, string>,
  orderBy: string
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: "asc" | "desc", orderBy: string) {
  return order === "desc"
    ? (a: Record<string, string>, b: Record<string, string>) => descendingComparator(a, b, orderBy)
    : (a: Record<string, string>, b: Record<string, string>) =>
        -descendingComparator(a, b, orderBy);
}

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
