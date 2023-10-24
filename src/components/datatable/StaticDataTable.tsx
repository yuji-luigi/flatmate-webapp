import { Table, ScrollArea, Divider, Box, Card } from '@mantine/core';

import StaticTableHeader from './header/StaticTableHeader';
import { StaticTableRow } from './table-rows/StaticTableRow';
import classes from './DataTable.module.css';

export function StaticDataTable({ json, data }: { json: any[]; data: any[] }) {
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  // const { classes } = dashboardStyle();
  return (
    <Card>
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
