import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TableSectionHeader } from '../../sections/dashboard_sections/datatable_section/TableSectionHeader';

import Tables from '../../components/datatable/Tables';
import Layout from '../../layouts';
import Page from '../../components/Page';
import { CrudDrawerDefault } from '../../components/drawer/CrudDrawerDefault';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { PATH_DASHBOARD } from '../../path/page-paths';
import { useCookieContext } from '../../context/CookieContext';

const HeadSpaceTable = () => {
  const entity = 'spaces';
  const router = useRouter();
  const { currentSpace } = useCookieContext();
  const { fetchCrudDocumentsWithPagination } = useCrudSliceStore();
  useEffect(() => {
    if (currentSpace) {
      router.push(`${PATH_DASHBOARD.childrenSpace}/${currentSpace._id}`);
      return;
    }
    // router.push(PATH_DASHBOARD.enterSpace)
    fetchCrudDocumentsWithPagination({ entity, query: '?isMain=true' });
  }, [entity, currentSpace?._id]); // include parentId: string | undefined to update on change page

  return (
    <Page>
      <div>
        <TableSectionHeader overridingEntity="spaces" />
        <Tables overridingEntity="spaces" />
      </div>
      <CrudDrawerDefault overridingEntity="spaces" />
    </Page>
  );
};

HeadSpaceTable.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

type Data = { data: any };

export default HeadSpaceTable;
