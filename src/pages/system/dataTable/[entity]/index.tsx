import { ReactElement } from "react";
import SystemAdminDashboardLayout from "../../../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";

type SystemDashboardPageProps = {
  getLayout: (page: ReactElement) => ReactElement;
};

const SystemDashboardPage = (props: SystemDashboardPageProps) => {
  return <>jey</>;
};
SystemDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout>{page}</SystemAdminDashboardLayout>;
};
export default SystemDashboardPage;
