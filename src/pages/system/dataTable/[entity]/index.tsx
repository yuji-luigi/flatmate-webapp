import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mantine/core";
import SystemAdminDashboardLayout from "../../../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import Page from "../../../../components/Page";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { CrudDataTable } from "../../../../components/datatable/CrudDataTable";
import { CrudDrawerDefault } from "../../../../components/drawer/CrudDrawerDefault";
import { TableSectionHeader } from "../../../../sections/dashboard/datatable_section/TableSectionHeader";
import { useCurrentEntityContext } from "../../../../context/CurrentEntityContext";
import { usePaginationContext } from "../../../../context/PaginationContext";
import { useGetCrudDocuments } from "../../../../hooks/useGetCrudDocuments";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import Entity from "../../../dashboard/[entity]";

type SystemDashboardPageProps = {
  getLayout: (page: ReactElement) => ReactElement;
};

const SystemTablePage = (props: SystemDashboardPageProps) => {
  const { query } = useRouterWithCustomQuery();
  const { entity } = query;
  const { paginationQuery } = usePaginationContext();
  useGetCrudDocuments({ entity, withPagination: true });
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  useEffect(() => {
    /** type guard */
    if (!entity) {
      return;
    }
    /** fetch all the entity if not childrenpage */
    fetchCrudDocumentsWithPagination({ entity, query: paginationQuery });
  }, [paginationQuery, entity, query.parentId]);
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
