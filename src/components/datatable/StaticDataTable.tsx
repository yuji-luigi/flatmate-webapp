import { Table, ScrollArea, Divider, Box } from '@mantine/core';

import StaticTableHeader from './table-rows/StaticTableHeader';
import { StaticTableRow } from './table-rows/StaticTableRow';
import classes from './DataTable.module.css';

export function StaticDataTable({ json, data }: { json: any[]; data: any[] }) {
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  // const { classes } = dashboardStyle();
  return (
    <Box>
      <ScrollArea>
        <Table className={classes.table} highlightOnHover>
          <StaticTableHeader json={json} />

          <tbody>
            {data?.map((rowData) => (
              <StaticTableRow key={rowData._id} sectionFormFields={json} rowData={rowData} />
            ))}
          </tbody>
        </Table>
        <Divider style={{ marginBottom: 20 }} />
      </ScrollArea>
    </Box>
  );
}
