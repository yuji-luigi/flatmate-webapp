import { useRouter } from 'next/router';
import React, { ReactElement, useEffect } from 'react';
import Page from '../../../components/Page';
import Tables from '../../../components/datatable/Tables';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';
import { usePaginationContext } from '../../../context/PaginationContext';
import { sections } from '../../../data';
import Layout from '../../../layouts';
import formFields from '../../../../json/dataTable/formfields';
import { useCrudSliceStore, useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { TableSectionHeader } from '../../../sections/dashboard_pages/datatable_section/TableSectionHeader';
import { Sections } from '../../../types/general/data/sections-type';
import { Button, Group, Select, createStyles, Text, Box } from '@mantine/core';
import Link from 'next/link';
import { PATH_CLIENT } from '../../../path/path-frontend';
import MaintainerList from '../../../sections/dashboard_pages/maintainers_page/MaintainerList';
import MaintainerPage from '.';

const MaintainerPageWithQuery = () => {
  return <MaintainerPage />;
};

MaintainerPageWithQuery.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MaintainerPageWithQuery;
