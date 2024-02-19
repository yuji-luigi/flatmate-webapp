import { ReactElement, useEffect } from 'react';
import Layout from '../../layouts';
import axiosInstance from '../../utils/axios-instance';
import { useCookieContext } from '../../context/CookieContext';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { DashboardRootTabPanels } from '../../sections/dashboard/dashboard_top/sections-in-tabs/dashboard/DashboardRootTabPanels';

const DashboardPage = () => {
  const { currentOrganization, currentSpace } = useCookieContext();
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    handleSectionData();
  }, [currentOrganization, currentSpace]);

  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/home`);
    const { space, maintainers, maintenances, threads, statistics } = rawRes.data.data || [];
    setCrudDocument({ entity: 'statistics', document: statistics });
    setCrudDocument({ entity: 'spaces', document: space });
    setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
    setCrudDocuments({ entity: 'threads', documents: threads });
  };
  return <DashboardRootTabPanels />;
};
DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export default DashboardPage;

// export async function getStaticProps({ locale }: { locale: string }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'], null, ['en', 'it'])),
//       // Will be passed to the page component as props
//     },
//   };
// }
