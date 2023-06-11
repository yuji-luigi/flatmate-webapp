import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../../layouts';
import PostsPageSection from '../../../sections/posts_list_section/PostsPageComponent';
import axiosInstance from '../../../utils/axios-instance';
import { useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
// import { useCurrentSpaceContext } from '../../../context/CurrentSpaceContext';
import { useCookieContext } from '../../../context/CookieContext';
import { getCookie } from 'cookies-next';
import SpaceHomeSection from '../../../sections/dashboard_sections/space_home_section/SpaceHomeSection';

export default function PostsPage({ space }: { space: SpaceModel }) {
  const { setCrudDocument } = useCrudSliceStore();
  const { currentSpace } = useCookieContext();
  useEffect(() => {
    setCrudDocument({ entity: 'spaces', document: space });
    console.log();
  }, [space?._id]);
  return <SpaceHomeSection /* threads={threads} */ />;
}

PostsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const jwtToken = context.req.cookies.jwt;

    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/spaces/single-by-cookie`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          space: context.req.cookies.space || '',
          organization: context.req.cookies.organization || '',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // const data = (await res.data.data) as Record<string, any>;

    const space = res.data.data || [];

    return {
      props: {
        space,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/logout',
      },
    };
  }
}
