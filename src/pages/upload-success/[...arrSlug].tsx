import { Container, Title, Text, Group, LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import useSWR from "swr";
import { PATH_API } from "../../path/path-api";
import axiosInstance, { AxiosResDataGeneric } from "../../utils/axios-instance";
import { CheckInterface } from "../../types/models/maintenance-check-type";
import { MaintainerModel } from "../../types/models/maintainer-model";
import { PreviewHandler } from "../../components/files/preview/PreviewHandler";
import classes from "./upload-succes-page.module.css";
import useRouterWithCustomQuery from "../../hooks/useRouterWithCustomQuery";

const fileFetcher = async (arrSlug?: string[]) => {
  if (!arrSlug) return null;
  try {
    console.log(arrSlug);
    const path = arrSlug.join("/");
    const rawCheck = await axiosInstance.get<
      AxiosResDataGeneric<{ check: CheckInterface; maintenance: MaintainerModel }>
    >(`${PATH_API.checks}/${path}`);
    return rawCheck.data.data;
  } catch (error: any) {
    throw error.message;
  }
};

export default function UploadSuccessPage() {
  const { query } = useRouterWithCustomQuery();
  const fetchKey = query.arrSlug?.length ? `${query.arrSlug}` : null;

  const { data, error, isLoading } = useSWR(fetchKey, () => fileFetcher(query.arrSlug), {});
  if (error) return <div>{error}</div>;
  return (
    <Container className={classes.root}>
      {!data || isLoading ? (
        <LoadingOverlay visible={isLoading} />
      ) : (
        <div className={classes.inner}>
          {/* <Illustration className={classes.image} /> */}
          <div className={classes.content}>
            <Title className={classes.title}>Upload success!</Title>
            <Text color="dimmed" size="lg" ta="center" className={classes.description}>
              Desc Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, asperiores unde,
              error repellendus quod ratione illum sequi esse tempore impedit ut quae dolorum
              molestias modi eligendi voluptatem consectetur facilis sit.
            </Text>
            <Group justify="center" gap={24}>
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
