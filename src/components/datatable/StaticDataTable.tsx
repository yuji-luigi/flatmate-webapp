import { Table, ScrollArea, Divider, Box, Card } from "@mantine/core";

import StaticTableHeader from "./header/StaticTableHeader";
import { StaticTableRow } from "./table-rows/StaticTableRow";
import classes from "./DataTable.module.css";
import { QueryFilterWeb } from "./filter/QueryFilterWeb";
import { FormFieldTypes } from "../../types/general/data/data-table/form-field-type/formField-types";

export function StaticDataTable({
  json,
  data,
  withFilter,
}: {
  json: FormFieldTypes[];
  data: any[];
  withFilter?: boolean;
}) {
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  // const { classes } = dashboardStyle();
  return (
    <Card>
      {withFilter && <QueryFilterWeb formFields={json} />}
      <Table.ScrollContainer minWidth={800}>
        <Table className={classes.table} highlightOnHover>
          <StaticTableHeader json={json} />

          <Table.Tbody>
            {data?.map((rowData) => (
              <StaticTableRow key={rowData._id} sectionFormFields={json} rowData={rowData} />
            ))}
          </Table.Tbody>
        </Table>
        <Divider style={{ marginBottom: 20 }} />
      </Table.ScrollContainer>
    </Card>
  );
}
