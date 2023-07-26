import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableSectionHeader } from '../../sections/dashboard_pages/datatable_section/TableSectionHeader';

import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sections } from '../../data';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { usePaginationContext } from '../../context/PaginationContext';
import { Sections } from '../../types/general/data/sections-type';
import { HeaderContainer } from '../../components/datatable/header/HeaderContainer';

const CrudPage = () => {
  const { query, push } = useRouter();

  const entity = query.entity as Sections;
  const { paginationQuery } = usePaginationContext();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  useEffect(() => {
    if (!sections.includes(entity)) {
      push('/dashboard/home');
    }
  }, [entity]); // include parentId: string | undefined to update on change page

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
    fetchCrudDocumentsWithPagination({ entity: entity, query: paginationQuery });
  }, [paginationQuery, entity, query.parentId]);

  return (
    <Page title={`Flatmates | ${entity}`}>
      <HeaderContainer>
        <TableSectionHeader />
      </HeaderContainer>
      <Tables />
      <CrudDrawerDefault />
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CrudPage;
