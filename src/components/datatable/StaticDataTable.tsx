import { Table, ScrollArea, Divider, Box } from '@mantine/core';

import { TableRow } from './table-rows/TableRow';

// import TableCellController from './table-rows/tablecell/TableCellController';
// import { useCrudSlice } from '../../../hooks/redux-hooks/useCrudSlice';
import { dashboardStyle } from '../../styles/global-useStyles';
import StaticTableHeader from './table-rows/StaticTableHeader';

export function StaticDataTable({ json, data }: { json: any[]; data: any[] }) {
  // const TOTAL = Math.ceil(users.length / ROWS_PER_PAGE);
  const { classes } = dashboardStyle();

  return (
    <Box className={classes.dataTableContainer}>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} highlightOnHover>
          <StaticTableHeader json={json} />

          <tbody>
            {data?.map((rowData) => (
              <TableRow key={rowData._id} sectionFormFields={json} rowData={rowData} />
            ))}
          </tbody>
        </Table>
        <Divider sx={{ marginBottom: 20 }} />
      </ScrollArea>
    </Box>
  );
}
