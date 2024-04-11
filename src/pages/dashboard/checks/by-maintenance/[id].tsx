import { ReactElement } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { Stack } from "@mantine/core";
import { useTranslation } from "next-i18next";
import { ChecksGrid } from "../../../../sections/dashboard/checks/ChecksGrid";
import Layout from "../../../../layouts";
import axiosInstance, { AxiosResDataGeneric } from "../../../../utils/axios-instance";
import { _PATH_API } from "../../../../path/path-api";
import { CheckInterface, MaintenanceModel } from "../../../../types/models/maintenance-check-type";
import { PageTitle } from "../../../../components/text/PageTitle";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";

const fileFetcher = async (entity?: string, id?: string) => {
  if (!id) return null;
  try {
    const rawCheck = await axiosInstance.get<
      AxiosResDataGeneric<{ checks: CheckInterface[]; maintenance: MaintenanceModel }>
    >(`${_PATH_API.checks.byMaintenanceId(id)}`);
    return rawCheck.data.data;
  } catch (error: any) {
    throw error.message;
  }
};
const ChecksByEntityPage = () => {
  const { query } = useRouterWithCustomQuery();
  const { entity, id } = query;
  const { t } = useTranslation();
  const { data, error } = useSWR<
    { checks: CheckInterface[]; maintenance: MaintenanceModel } | null,
    AxiosError
  >(["checks", entity, id], () => fileFetcher(entity, id));

  const { checks, maintenance } = data || {};
  if (!checks) return null;
  if (error) return <div>{error.message}</div>;
  return (
    <Stack>
      <PageTitle title="Maintenance" subtitle="Checks" />
      <ChecksGrid checks={checks} />
    </Stack>
  );
};

ChecksByEntityPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export default ChecksByEntityPage;
