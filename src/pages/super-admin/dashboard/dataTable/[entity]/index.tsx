import { ReactElement, useEffect } from "react";
import { Box } from "@mantine/core";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { Page } from "@alexandernanberg/react-pdf-renderer";
import { CrudDataTable } from "../../../../../components/datatable/CrudDataTable";
import { CrudDrawerDefault } from "../../../../../components/drawer/CrudDrawerDefault";
import { usePaginationContext } from "../../../../../context/PaginationContext";
import { useGetCrudDocuments } from "../../../../../hooks/useGetCrudDocuments";
import useRouterWithCustomQuery from "../../../../../hooks/useRouterWithCustomQuery";
import SystemAdminDashboardLayout from "../../../../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import { useCrudSliceStore } from "../../../../../redux/features/crud/crudSlice";
import { TableSectionHeader } from "../../../../../sections/dashboard/datatable_section/TableSectionHeader";
import { MetaPage } from "../../../../../components/page-components/MetaPage";

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
    <MetaPage title={entity?.toUpperCase()} otherHead={undefined}>
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
    </MetaPage>
  );
};
SystemTablePage.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout>{page}</SystemAdminDashboardLayout>;
};
export default SystemTablePage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  return {
    props: {
      ...translationObj,
    },
  };
}
