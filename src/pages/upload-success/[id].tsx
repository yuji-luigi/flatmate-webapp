import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  Group,
  rem,
  LoadingOverlay,
} from '@mantine/core';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { PATH_API } from '../../path/api-routes';
import axiosInstance from '../../utils/axios-instance';
import Link from 'next/link';
import { CheckInterface } from '../../types/models/check-type';
const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  inner: {
    position: 'relative',
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    paddingTop: rem(220),
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

const fileFetcher = async (id?: string) => {
  if (!id) return null;
  try {
    const rawCheck = await axiosInstance.get(`${PATH_API.checks}/${id}`);
    return rawCheck.data.data;
  } catch (error: any) {
    throw error.message;
  }
};

export default function UploadSuccessPage() {
  const { classes } = useStyles();
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const { data, error, isLoading } = useSWR<CheckInterface>(`${query.id}`, () =>
    fileFetcher(query.id)
  );
  if (error) return <div>{error}</div>;
  console.log(data);
  return (
    <Container className={classes.root}>
      {!data || isLoading ? (
        <LoadingOverlay visible={isLoading} />
      ) : (
        <div className={classes.inner}>
          {/* <Illustration className={classes.image} /> */}
          <div className={classes.content}>
            <Title className={classes.title}>Upload success!</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
              Desc Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, asperiores unde,
              error repellendus quod ratione illum sequi esse tempore impedit ut quae dolorum
              molestias modi eligendi voluptatem consectetur facilis sit.
            </Text>
            <Group position="center">
              <Button component={Link} href={data.file.url} size="md">
                Check uploaded file
              </Button>
            </Group>
          </div>
        </div>
      )}
    </Container>
  );
}
