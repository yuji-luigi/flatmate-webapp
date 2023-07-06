import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import PostsPageSection from '../../../sections/dashboard_pages/posts_list_page/PostsPageComponent';
import axiosInstance from '../../../utils/axios-instance';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
// import { useCurrentSpaceContext } from '../../../context/CurrentSpaceContext';
import { useCookieContext } from '../../../context/CookieContext';
import { getCookie } from 'cookies-next';
import SpaceHomeSection from '../../../sections/dashboard_pages/space_home_section/SpaceHomeSection';
import { useRouter } from 'next/router';
import axios from 'axios';
import { MaintainerModel } from '../../../types/models/maintainer-model';

interface Props {
  space: SpaceModel;
  maintainers: MaintainerModel[];
  maintenances: MaintenanceModel[];
  threads: ThreadModel[];
}

export default function PostsPage({ space, maintainers, maintenances, threads }: Props) {
  const { setSingleCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    setSingleCrudDocument({ entity: 'spaces', document: space });
    setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
    setCrudDocuments({ entity: 'threads', documents: threads });
  }, [space?._id]);

  return <SpaceHomeSection /* threads={threads} */ />;
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getStaticPaths() {
  // Generate paths for buildings
  const mainSpaces = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/spaces/ssg-paths?ssg_secret=${process.env.NEXT_PUBLIC_SSG_SECRET}`
  );
  const paths = mainSpaces.data.data.map((space: SpaceModel) => ({ params: { slug: space } }));
  return {
    paths,
    fallback: 'blocking', // false or "blocking"
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const slug = params.slug;
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/spaces/static-props/${slug}`,
      {
        params: { ssg_secret: process.env.NEXT_PUBLIC_SSG_SECRET },
      }
    );
    const data = res.data.data;
    // const data = ~await res.json();

    // const data = await res.json();
    const { space, maintainers, maintenances, threads } = data || [];
    return {
      props: {
        space,
        maintainers,
        maintenances,
        threads,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/error',
      },
    };
  }
}
