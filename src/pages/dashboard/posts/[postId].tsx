import React, { useEffect, ReactElement } from 'react';
import { createStyles, Container, Divider } from '@mantine/core';
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

const useStyles = createStyles((theme) => ({
  main: {
    minHeight: 'calc(100vh - 64px)',
    @media (max-width: 768px): {
      paddingInline: 0,
    },
  },

  articleMenuDivider: {
    marginBlock: var(--mantine-spacing-xl,
  },
}));

const PostIdPage = ({ thread }: { thread: ThreadModel }) => {
  const { classes, cx, theme } = useStyles();
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
        },
      };
    }

    // by default show the single post
    return {
      props: {
        thread,
      },
    };
  } catch (error) {
    // log error and send to posts page
    console.error(error);
    return {
      redirect: {
        destination: '/dashboard/posts',
      },
    };
  }
};

export default PostIdPage;
