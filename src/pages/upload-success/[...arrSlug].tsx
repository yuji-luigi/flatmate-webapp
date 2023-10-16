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
import Link from 'next/link';
import { PATH_API } from '../../path/path-api';
import axiosInstance, { AxiosResDataGeneric } from '../../utils/axios-instance';
import { CheckInterface } from '../../types/models/check-type';
import { intlDateFormat } from '../../utils/helpers/date-formatters';
import { ParsedQueryCustom } from '../../types/nextjs-custom-types/useRouter-types';
import { MaintainerModel } from '../../types/models/maintainer-model';
import { PreviewHandler } from '../../components/files/preview/PreviewHandler';

const useStyles = createStyles((theme) => ({
  root: {
    padding-top: rem(80),
    padding-bottom: rem(80),
  },

  inner: {
    position: relative,
  },

  image: {
    ...theme.fn.cover(),
    opacity: 0.75,
  },

  content: {
    padding-top: rem(220),
    position: relative,
    zIndex: 1,

    @media (max-width: $mantine-breakpoint-sm): {
      padding-top: rem(120),
    },
  },

  title: {
    font-family: Greycliff CF, var(--mantine-font-family),
    textAlign: 'center',
    font-weight: 900,
    font-size: rem(38),

    @media (max-width: $mantine-breakpoint-sm): {
      font-size: rem(32),
    },
  },

  description: {
    max-width: rem(540),
    margin: 'auto',
    margin-top: var(--mantine-spacing-xl),
    margin-bottom: `calc(var(--mantine-spacing-xl)) * 1.5)`,
  },
}));

const fileFetcher = async (arrSlug?: string[]) => {
  if (!arrSlug) return null;
  try {
    console.log(arrSlug);
    const path = arrSlug.join('/');
    const rawCheck = await axiosInstance.get<
      AxiosResDataGeneric<{ check: CheckInterface; maintenance: MaintainerModel }>
    >(`${PATH_API.checks}/${path}`);
    return rawCheck.data.data;
  } catch (error: any) {
    throw error.message;
  }
};

export default function UploadSuccessPage() {
  const { classes } = useStyles();
  const { query }: { query: ParsedQueryCustom } = useRouter();
  const fetchKey = query.arrSlug?.length ? `${query.arrSlug}` : null;

  const { data, error, isLoading } = useSWR(fetchKey, () => fileFetcher(query.arrSlug), {});
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
            <Group position="center" spacing={24}>
              {data.check.files.map((file) => (
                // <Link key={file._id} href={file.url}>
                <PreviewHandler key={file._id} enableLink file={file} />
                // </Link>
                // <Button component={Link} href={file.url} target="_blank" size="md">
                //   {file.originalFileName}-{intlDateFormat(file.createdAt)}
                // </Button>
              ))}
            </Group>
          </div>
        </div>
      )}
    </Container>
  );
}
