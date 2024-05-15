import { ReactElement, useEffect } from "react";
import { Stack } from "@mantine/core";
import SystemAdminDashboardLayout from "../../../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import Page from "../../../../components/Page";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { usePaginationContext } from "../../../../context/PaginationContext";
import { useGetCrudDocuments } from "../../../../hooks/useGetCrudDocuments";
import { useCrudSliceStore } from "../../../../redux/features/crud/crudSlice";
import MaintainerList from "../../../../sections/dashboard/maintainers_page/MaintainerList";

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
      <Stack>
        {/* <TableSectionHeader overridingEntity="maintainers" /> */}
        {/* <QueryFilterWeb formFields={maintainersTableData} /> */}
        <MaintainerList entity={entity} />
        {/* <CrudDrawerDefault overridingEntity="maintainers" /> */}
      </Stack>
    </Page>
  );
};
SystemTablePage.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout>{page}</SystemAdminDashboardLayout>;
};
export default SystemTablePage;
