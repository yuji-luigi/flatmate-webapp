import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import MaintenanceListPageSection from '../../../sections/dashboard/maintenance_list_page/MaintenanceListPageSection';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { ThreadModel } from '../../../types/models/thread-model';

export default function MaintenanceListPage({ maintenances }: { maintenances: ThreadModel[] }) {
  const { setCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
  }, [maintenances]);
  return <MaintenanceListPageSection /* maintenances={maintenances} */ />;
}

MaintenanceListPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const jwtToken = context.req.cookies.jwt;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      space: context.req.cookies.space || '',
      organization: context.req.cookies.organization || '',
    },
  });

  const data = (await res.json()) as Record<string, any>;

  const maintenances = data.data || [];

  return {
    props: {
      maintenances,
    },
  };
}
