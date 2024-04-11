import { ReactElement } from "react";
import { useRouter } from "next/router";
import { Box } from "@mantine/core";
import SystemAdminDashboardLayout from "../../../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import Page from "../../../../components/Page";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { CrudDataTable } from "../../../../components/datatable/CrudDataTable";
import { CrudDrawerDefault } from "../../../../components/drawer/CrudDrawerDefault";
import { TableSectionHeader } from "../../../../sections/dashboard/datatable_section/TableSectionHeader";

type SystemDashboardPageProps = {
  getLayout: (page: ReactElement) => ReactElement;
};

const SystemTablePage = (props: SystemDashboardPageProps) => {
  const router = useRouterWithCustomQuery();
  const { entity } = router.query;
  return (
    <Page title={entity}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--flex-gap)",
        }}
      >
        <TableSectionHeader />
        <CrudDataTable />
        <CrudDrawerDefault />
      </Box>
    </Page>
  );
};
SystemTablePage.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout>{page}</SystemAdminDashboardLayout>;
};
export default SystemTablePage;
