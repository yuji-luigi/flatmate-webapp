import { Box } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, ReactElement } from "react";
import useAuth from "../../../hooks/useAuth";
import { usePaginationContext } from "../../context/PaginationContext";
import { useGetCrudDocuments } from "../../hooks/useGetCrudDocuments";
import useRouterWithCustomQuery from "../../hooks/useRouterWithCustomQuery";
import { flatNavConfigs } from "../../json/nav-config";
import Layout from "../../layouts";
import { hasMatchedUrl } from "../../lib/regexUrl";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";
import { TableSectionHeader } from "../../sections/dashboard/datatable_section/TableSectionHeader";
import { isFrontendEntity } from "../../types/redux/CrudSliceInterfaces";
import { CrudDataTable } from "../datatable/CrudDataTable";
import { CrudDrawerDefault } from "../drawer/CrudDrawerDefault";
import Page from "../Page";
import LoadingScreen from "../screen/LoadingScreen";
import { _PATH_FRONTEND } from "../../path/path-frontend";

const CrudPageView = () => {
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
    push(_PATH_FRONTEND.pathAfterLogin(user.loggedAs));
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

export default CrudPageView;
