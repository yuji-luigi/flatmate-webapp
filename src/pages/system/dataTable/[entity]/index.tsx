import { ReactElement } from "react";
import { useRouter } from "next/router";
import SystemAdminDashboardLayout from "../../../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import Page from "../../../../components/Page";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";

type SystemDashboardPageProps = {
  getLayout: (page: ReactElement) => ReactElement;
};

const SystemTablePage = (props: SystemDashboardPageProps) => {
  const router = useRouterWithCustomQuery();
  const { entity } = router.query;
  return <Page title={entity}>jey</Page>;
};
SystemTablePage.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout>{page}</SystemAdminDashboardLayout>;
};
export default SystemTablePage;
