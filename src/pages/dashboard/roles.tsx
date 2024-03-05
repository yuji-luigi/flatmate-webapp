import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TableSectionHeader } from '../../sections/dashboard/datatable_section/TableSectionHeader';

import Layout from '../../layouts';
import { sections } from '../../data';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { usePaginationContext } from '../../context/PaginationContext';
import { Sections } from '../../types/general/data/sections-type';
import { HeaderContainer } from '../../components/datatable/header/HeaderContainer';
import { CrudDataTable } from '../../components/datatable/CrudDataTable';
import { useGetCrudDocuments } from '../../hooks/useGetCrudDocuments';
import useAuth from '../../../hooks/useAuth';
import { useCurrentEntityContext } from '../../context/CurrentEntityContext';

const CrudPage = () => {
  const { query, push } = useRouter();

  const entity = 'roles';
  useCurrentEntityContext(entity);
  useGetCrudDocuments({ entity, withPagination: true });
  useEffect(() => {
    if (!sections.includes(entity)) {
      push('/dashboard/home');
    }
  }, [entity]); // include parentId: string | undefined to update on change page

  return (
    <Page title={`Flatmates | ${entity}`}>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 'var(--flex-gap)' }}>
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
  const translationObj = await serverSideTranslations(context.locale || 'it', ['common'], null, [
    'it',
    'en',
  ]);
  return {
    props: {
      ...translationObj,
    },
  };
}

export default CrudPage;
