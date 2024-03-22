import { Table, ScrollArea, Pagination, Divider, Box, Card } from "@mantine/core";
import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { CrudTableRow } from "./table-rows/CrudTableRow";

import CrudTableHeader from "./header/CrudTableHeader";
// import TableCellController from './table-rows/tablecell/TableCellController';
import formFields from "../../../json/dataTable/formfields";
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { usePaginationContext } from "../../context/PaginationContext";
import { useCrudSelectors } from "../../redux/features/crud/crudSlice";
import { Sections } from "../../types/general/data/sections-type";
import { FormFieldTypes } from "../../types/general/data/data-table/form-field-type/formField-types";
import classes from "../../styles/global-useStyles.module.css";
import { ParsedQueryCustom } from "../../types/nextjs-custom-types/useRouter-types";
import { useCurrentEntityContext } from "../../context/CurrentEntityContext";

export function CrudDataTable({ overridingEntity = "" }: { overridingEntity?: Sections }) {
  const ROWS_PER_PAGE = 10;
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  // const { classes } = dashboardStyle();

  const [page, setPage] = useState(1);
  const { setPagination } = usePaginationContext();
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { currentEntity: entity } = useCurrentEntityContext();
  const { crudDocuments, totalDocumentsCount, crudStatus } = useCrudSelectors(entity);

  const sectionFormFields = formFields[entity as Sections];
  useEffect(() => {
    setPage(1);
    setPagination(1);
  }, [entity]);

  if (!sectionFormFields) {
    return <h1>Please provide the formField.json file to display the table</h1>;
  }

  sectionFormFields.sort(
    (a: FormFieldTypes, b: FormFieldTypes) => a.priority || 0 - (b.priority || 0)
  );

  const TOTAL = Math.floor((totalDocumentsCount - 1) / ROWS_PER_PAGE) + 1;

  function onPageChange(pageNumber: number) {
    setPage(pageNumber);
    setPagination(pageNumber); //! after setting the pagination. useEffect will be called to fetch the documents
  }
  return (
    <Card className={classes.dataTableContainer}>
      <Table.ScrollContainer minWidth={800}>
        {!crudDocuments?.length && crudStatus === "loading" ? (
          <p>loading</p>
        ) : (
          <Table style={{}} highlightOnHover>
            <CrudTableHeader overridingEntity={overridingEntity} />

            <Table.Tbody>
              {crudDocuments?.map((rowData) => (
                <CrudTableRow
                  overridingEntity={overridingEntity}
                  key={rowData._id}
                  sectionFormFields={sectionFormFields}
                  rowData={rowData}
                />
              ))}
            </Table.Tbody>
          </Table>
        )}
        <Divider style={{ marginBottom: 20 }} />
      </Table.ScrollContainer>
      <Pagination value={page} onChange={(pageNumber) => onPageChange(pageNumber)} total={TOTAL} />
    </Card>
  );
}
