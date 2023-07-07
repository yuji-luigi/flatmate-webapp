import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableSectionHeader } from '../../sections/dashboard_pages/datatable_section/TableSectionHeader';

import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import { sections } from '../../data';
import formFields from '../../../json/dataTable/formfields';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { usePaginationContext } from '../../context/PaginationContext';
import { Sections } from '../../types/general/data/sections-type';
import { Box } from '@mantine/core';
import { HeaderContainer } from '../../components/datatable/header/HeaderContainer';
import { FormFieldTypes } from '../../types/general/data/data-table/formField-types';

const CrudPage = () => {
  const { query, push } = useRouter();

  const entity = query.entity as Sections;
  const { setPagination, paginationQuery } = usePaginationContext();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
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
      {/* <Box px={32}> */}
      <HeaderContainer>
        <TableSectionHeader />
      </HeaderContainer>
      <Tables />
      {/* </Box> */}
      <CrudDrawerDefault />
    </Page>
  );
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CrudPage;
