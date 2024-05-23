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
import {
  Entity,
  frontendEntities,
  isFrontendEntity,
} from "../../../types/redux/CrudSliceInterfaces";
import { sectionConfigsByUserType } from "../../../json/section-config/sectionsConfig";
import useAuth from "../../../../hooks/useAuth";
import { flatNavConfigs, navConfigs } from "../../../json/nav-config";
import { hasMatchedString, hasMatchedUrl } from "../../../lib/regexUrl";
import LoadingScreen from "../../../components/screen/LoadingScreen";
import { _PATH_FRONTEND, FRONTEND_ROOT } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

const CrudPage = () => {
  const { query, push, asPath } = useRouterWithCustomQuery();
  const { entity } = query;
  const { paginationQuery } = usePaginationContext();
  const { user } = useAuth();
  useGetCrudDocuments({ entity, withPagination: true });
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();

  useEffect(() => {
    /** type guard */
    if (!entity) {
      return;
    }
    if (!isFrontendEntity(entity)) {
      return;
    }
    /** fetch all the entity if not childrenpage */
    fetchCrudDocumentsWithPagination({ entity, query: paginationQuery });
  }, [paginationQuery, entity, query.parentId]);
  if (!user?.loggedAs) {
    push("/login");
    return;
  }

  const foundSectionConfig = flatNavConfigs[user?.loggedAs].find((section) =>
    hasMatchedUrl(asPath, section.link)
  );
  if (!foundSectionConfig) {
    push(_PATH_FRONTEND.dashboard.home);
    return <LoadingScreen />;
  }
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
