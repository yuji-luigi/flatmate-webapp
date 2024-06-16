import useSWR from "swr";
import { ReactElement, useEffect } from "react";
import axiosInstance from "../../../../utils/axios-instance";

import { CrudDataTable } from "../../../../components/datatable/CrudDataTable";
import Layout from "../../../../layouts";
import { TableSectionHeader } from "../../../../sections/dashboard/datatable_section/TableSectionHeader";
import Page from "../../../../components/Page";
import useLayoutContext from "../../../../../hooks/useLayoutContext";
import { CrudDrawerDefault } from "../../../../components/drawer/CrudDrawerDefault";
import {
  /* useCrudSelectors, */ useCrudSliceStore,
} from "../../../../redux/features/crud/crudSlice";
import { usePaginationContext } from "../../../../context/PaginationContext";
import { useCookieContext } from "../../../../context/CookieContext";
import { MongooseBaseModel } from "../../../../types/models/mongoose-base-model";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";

const fetcher = (args: string) => axiosInstance.get(args).then((res) => res.data?.data);

const ChildrenTablePage = () => {
  const { query } = useRouterWithCustomQuery();
  // get currentSpace from context
  const { currentSpace } = useCookieContext();
  const { fetchLinkedChildrenWithPagination } = useCrudSliceStore();
  // const { crudStatus } = useCrudSelectors(query.entity);
  const { paginationQuery } = usePaginationContext();

  const { setParentData } = useLayoutContext();

  const { setBreadcrumbs, setChildrenBreadcrumbs } = useLayoutContext();

  // const { data, error } = useSWR(
  //   `/${PATH_API.linkedChildren}/${query.entity}/${query.parentId}`,
  //   fetcher
  // );
  const { data: parentData, error: parentError } = useSWR<MongooseBaseModel & { name: string }>(
    `/${query.entity}/${query.parentId}`,
    fetcher
  );

  useEffect(() => {
    /** type guard condition */
    if (!query.entity || !query.parentId) {
      return;
    }
    fetchLinkedChildrenWithPagination({
      entity: query.entity,
      parentId: query.parentId,
      query: paginationQuery,
    });
    // setCrudDocuments({ entity: query.entity, documents: data?.data || [], isChildrenTree: true });

    if (parentData) {
      setParentData(parentData);
      // setBreadcrumbs({ title: parentData.name, href: parentData._id });
      setChildrenBreadcrumbs({ title: parentData.name, href: parentData._id });
    }
  }, [parentData, paginationQuery, currentSpace?._id]);

  // console.log(query.parentId);

  // if (crudStatus === 'loading' || crudStatus === 'idle') {
  //   return <p>loading</p>;
  // }
  if (parentError) {
    return <p>{parentError.message || parentError || "error occurred"}</p>;
  }

  return (
    <Page title={`${query.entity}`}>
      <TableSectionHeader />
      <CrudDataTable />
      <CrudDrawerDefault />
    </Page>
  );
};

ChildrenTablePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ChildrenTablePage;
