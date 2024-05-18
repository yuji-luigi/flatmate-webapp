import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { Stack } from "@mantine/core";
import Page from "../../../components/Page";
import { CrudDrawerDefault } from "../../../components/drawer/CrudDrawerDefault";
import { usePaginationContext } from "../../../context/PaginationContext";
import Layout from "../../../layouts";
import formFields from "../../../json/dataTable/formfields";
import { useCrudSliceStore, useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import { TableSectionHeader } from "../../../sections/dashboard/datatable_section/TableSectionHeader";
import MaintainerList from "../../../sections/dashboard/maintainers_page/MaintainerList";
import { maintainersTableData } from "../../../json/dataTable/formfields/maintainersTableData";
import { QueryFilterWeb } from "../../../components/datatable/filter/QueryFilterWeb";
import { useCurrentEntityContext } from "../../../context/CurrentEntityContext";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";

const MaintainerPage = () => {
  const { query } = useRouter();

  const entity = "maintainer";
  useRouterWithCustomQuery({ entity: "maintainer" });
  const { paginationQuery } = usePaginationContext();
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  formFields;

  useEffect(() => {
    /** type guard */
    if (!entity) {
      return;
    }
    /** check if this is a childrenPage */
    if (query.parentId) {
      return;
    }
    /** fetch all the entity if not childrenpage */
    fetchCrudDocumentsWithPagination({ entity, query: paginationQuery });
  }, [paginationQuery, entity, query.parentId]);

  return (
    <Page title="Maintainers">
      <Stack>
        {/* <TableSectionHeader overridingEntity="maintainer" /> */}
        {/* <QueryFilterWeb formFields={maintainersTableData} /> */}
        <MaintainerList entity={entity} />
        {/* <CrudDrawerDefault overridingEntity="maintainer" /> */}
      </Stack>
    </Page>
  );
};

MaintainerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerPage;
