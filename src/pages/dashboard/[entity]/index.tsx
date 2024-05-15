import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { TableSectionHeader } from "../../../sections/dashboard/datatable_section/TableSectionHeader";

import Layout from "../../../layouts";
import Page from "../../../components/Page";
import { CrudDrawerDefault } from "../../../components/drawer/CrudDrawerDefault";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { usePaginationContext } from "../../../context/PaginationContext";
import { CrudDataTable } from "../../../components/datatable/CrudDataTable";
import { useGetCrudDocuments } from "../../../hooks/useGetCrudDocuments";
import { useCurrentEntityContext } from "../../../context/CurrentEntityContext";
import { Entity } from "../../../types/redux/CrudSliceInterfaces";

const CrudPage = () => {
  const { query, push } = useRouter();
  const { currentEntity: entity } = useCurrentEntityContext(query.entity as Entity);
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
    <Page title={`Flatmates | ${entity}`}>
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

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

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

export default CrudPage;
