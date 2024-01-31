//useSWR allows the use of SWR inside function components

import { Container, Box } from '@mantine/core';
//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
import { useMediaQuery } from '@mantine/hooks';
import PostList from './PostList';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';
import { useCookieContext } from '../../../../context/CookieContext';
import { ThreadModel } from '../../../../types/models/thread-model';
import classes from './PostsPageComponent.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface TypeMock {
  title: string;
  description: string;
  date: string;
  image?: undefined;
  user?: undefined;
}

interface mock2 {
  image: string;
  avatar: string;
  name: string;
  description: string;
  job: string;
  stats: {
    value: string;
    label: string;
  }[];
  user: string;
}

export default function PostListPageComponent() {
  const { crudDocuments: threads } = useCrudSelectors<ThreadModel>('threads');
  const { currentSpace } = useCookieContext();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const contents = (
    <Box
      className={classes.pinContainer}
      py="xl" /* cols={2} breakpoints={[{ max-width: 'sm', cols: 1 }]} */
    >
      {/* todo create Cards component where differentiate card by thread.type */}
      {threads.map((thread) => (
        <PostList key={thread._id} thread={thread} />
      ))}
    </Box>
  );

  return <>{isMobile ? <Container>{contents}</Container> : <>{contents}</>}</>;
}
