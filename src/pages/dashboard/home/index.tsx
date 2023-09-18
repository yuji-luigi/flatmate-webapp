import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import PostsPageSection from '../../../sections/@dashboard/posts_list_page/PostsPageComponent';
import axiosInstance from '../../../utils/axios-instance';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
// import { useCurrentSpaceContext } from '../../../context/CurrentSpaceContext';
import { useCookieContext } from '../../../context/CookieContext';
import { getCookie } from 'cookies-next';
import SpaceHomeSection from '../../../sections/@dashboard/dashboard_top/sections-in-tabs/SpaceHomeSection';
import { useRouter } from 'next/router';
import { MaintainerModel } from '../../../types/models/maintainer-model';
import { MaintenanceModel } from '../../../types/models/maintenance-model';
import { SpaceModel } from '../../../types/models/space-model';
import { ThreadModel } from '../../../types/models/thread-model';

interface Props {
  space: SpaceModel;
  maintainers: MaintainerModel[];
  maintenances: MaintenanceModel[];
  threads: ThreadModel[];
}

export default function DashboardHomePage(/* { space, maintainers, maintenances, threads }: Props */) {
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();
  const { currentOrganization, currentSpace } = useCookieContext();
  useEffect(() => {
    handleSectionData();
  }, [currentOrganization, currentSpace]);
  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/spaces/home`);
    const { space, maintainers, maintenances, threads } = rawRes.data.data || [];

    setCrudDocument({ entity: 'spaces', document: space });
    setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
    setCrudDocuments({ entity: 'threads', documents: threads });
  };
  return <SpaceHomeSection /* threads={threads} */ />;
}

DashboardHomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const jwtToken = context.req.cookies.jwt;

//     const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/spaces/home`, {
//       headers: {
//         Authorization: `Bearer ${jwtToken}`,
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//     });

//     // const data = (await res.data.data) as Record<string, any>;

//     const { space, maintainers, maintenances, threads } = res.data.data || [];

//     return {
//       props: {
//         space,
//         maintainers,
//         maintenances,
//         threads,
//       },
//     };
//   } catch (error: any) {
//     return {
//       redirect: {
//         destination: '/error',
//       },
//     };
//   }
// }
