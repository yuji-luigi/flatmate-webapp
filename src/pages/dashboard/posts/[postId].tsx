import React, { useEffect, ReactElement } from 'react';
import { Container, Divider } from '@mantine/core';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import axiosInstance from '../../../utils/axios-instance';
import Layout from '../../../layouts';
import PostEditButton from '../../../components/posts/PostEditButton';

import RelatedArticlesArea from '../../../sections/@dashboard/single_post_page/RelatedArticleArea';
import { CrudDrawerDefault } from '../../../components/drawer/CrudDrawerDefault';
import { useCrudSliceStore, useCrudSelectors } from '../../../redux/features/crud/crudSlice';
import { ThreadModel } from '../../../types/models/thread-model';
import { ParsedQueryCustom } from '../../../types/nextjs-custom-types/useRouter-types';
import { SingleArticleCard } from '../../../components/posts/SingleArticleCard';
import { SingleArticleHeading } from '../../../components/posts/SingleArticleHeading';
import classes from './PostIdPage.module.css';

const PostIdPage = ({ thread }: { thread: ThreadModel }) => {
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { selectCrudDocument } = useCrudSliceStore();
  const { crudDocument: _thread } = useCrudSelectors<ThreadModel>('threads');

  useEffect(() => {
    if (!query.postId) return;
    selectCrudDocument({ entity: 'threads', document: thread });
    // eslint-disable-next-line consistent-return
    return () => {
      selectCrudDocument({ entity: 'threads', documentId: null });
    };
  }, []);

  if (!_thread?._id) return null;

  return (
    <Container py="lg" className={classes.main}>
      <SingleArticleHeading data={_thread} />
      <PostEditButton data={_thread} entity="threads" />
      <SingleArticleCard data={_thread} />
      <Divider className={classes.articleMenuDivider} />
      <RelatedArticlesArea />
      <CrudDrawerDefault overridingEntity="threads" />
    </Container>
  );
};
PostIdPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  console.log('getServerSideProps');
  const jwtToken = context.req.cookies.jwt;
  try {
    const rawThread = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/threads/${context.query.postId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          space: context.req.cookies.space || '',
          organization: context.req.cookies.organization || '',
        },
      }
    );

    const thread = rawThread.data.data;
    // define case nothing is in the data. go back to posts page
    if (!thread) {
      return {
        redirect: {
          destination: '/dashboard/posts',
          permanent: false,
        },
      };
    }

    // by default show the single post
    return {
      props: {
        thread,
      },
    };
  } catch (error: any) {
    // log error and send to posts page
    console.error(error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request data:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return {
      redirect: {
        destination: '/dashboard/posts',
      },
    };
  }
};

export default PostIdPage;
