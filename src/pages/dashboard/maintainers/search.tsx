import { Box } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Page from "../../../components/Page";
import { CrudDrawerDefault } from "../../../components/drawer/CrudDrawerDefault";
import { usePaginationContext } from "../../../context/PaginationContext";
// import { sections } from "../../../data/section-json";
import { useCrudSliceStore, useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import { TableSectionHeader } from "../../../sections/dashboard/datatable_section/TableSectionHeader";
import formFields from "../../../json/dataTable/formfields";
import Layout from "../../../layouts";
import { CrudDataTable } from "../../../components/datatable/CrudDataTable";

const MaintainerSearchPage = () => {
  const { query } = useRouter();

  const entity = "maintainer";
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
    <Page>
      {/* <Group align="end" justify="apart" pl={16} mb={32} style={{ width: '100%' }}> */}
      <Box px={32}>
        <TableSectionHeader overridingEntity="maintainer" />
      </Box>
      {/* </Group> */}
      {/* <Tables overridingEntity="maintainer" /> */}
      <CrudDataTable overridingEntity="maintainer" />
      <CrudDrawerDefault overridingEntity="maintainer" />
    </Page>
  );
};

MaintainerSearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerSearchPage;
