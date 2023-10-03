import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import { createStyles } from '@mantine/core';
import Page from '../../../components/Page';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';
import { usePaginationContext } from '../../../context/PaginationContext';
import Layout from '../../../layouts';
import formFields from '../../../../json/dataTable/formfields';
import { useCrudSliceStore, useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { TableSectionHeader } from '../../../sections/@dashboard/datatable_section/TableSectionHeader';
import MaintainerList from '../../../sections/@dashboard/maintainers_page/MaintainerList';
import { HeaderContainer } from '../../../components/datatable/header/HeaderContainer';
import { maintainersTableData } from '../../../../json/dataTable/formfields/maintainersTableData';
import { QueryFilterWeb } from '../../../components/datatable/filter/QueryFilterWeb';

const useStyles = createStyles((theme) => ({
  secondButton: {
    marginBlock: 32,
    alignSelf: 'end',
    backgroundColor: theme.colors.blue[7],
    color: theme.colors.blue[0],
    '&:hover': {
      backgroundColor: theme.colors.blue[8],
      color: theme.colors.blue[0],
    },
  },
}));

const MaintainerPage = () => {
  const { query, push } = useRouter();
  const { classes } = useStyles();

  const entity = 'maintainers';
  const { setPagination, paginationQuery } = usePaginationContext();

  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  const { crudDocuments, isChildrenTree } = useCrudSelectors(entity);
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
      <HeaderContainer>
        <TableSectionHeader overridingEntity="maintainers" />
        <QueryFilterWeb entity={entity} formFields={maintainersTableData} />
      </HeaderContainer>
      <MaintainerList entity={entity} />
      <CrudDrawerDefault overridingEntity="maintainers" />
    </Page>
  );
};

MaintainerPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerPage;
