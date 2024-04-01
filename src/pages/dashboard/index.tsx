import { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Layout from "../../layouts";
import axiosInstance, { AxiosMeResponse } from "../../utils/axios-instance";
import { useCookieContext } from "../../context/CookieContext";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";
import { PATH_AUTH } from "../../path/path-api";
import { DashboardTabPanels } from "../../layouts/dashboard/sections-in-tabs/tabs/DashboardRootTabPanels";
import { toTitleCase } from "../../lib/toTitleCase";
import { MeUser } from "../../types/models/space-model";

const DashboardPage = ({ initialUser }: { initialUser: MeUser }) => {
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    handleSectionData();
  }, []);

  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/home`);
    const { space, maintainers, maintenances, threads, statistics } = rawRes.data.data || [];

    setCrudDocument({ entity: "statistics", document: statistics });
    setCrudDocument({ entity: "spaces", document: space });
    // setCrudDocuments({ entity: 'maintainers', documents: maintainers });
    setCrudDocuments({ entity: "maintenances", documents: maintenances });
    // setCrudDocuments({ entity: 'threads', documents: threads });
  };
  const role = initialUser.loggedAs;
  const title = `Flatmates© | ${toTitleCase(role)}`;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <DashboardTabPanels />
    </>
  );
};
DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  const { jwt: jwtToken } = context.req.cookies;
  if (!jwtToken) {
    return { props: { user: null, ...translationObj } };
  }
  const rawRes = await axiosInstance.get<AxiosMeResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`,
    {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );
  const { user } = rawRes.data;
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  // if (user.loggedAs === "property_manager") {
  //   return {
  //     redirect: {
  //       destination: _PATH_FRONTEND.property_manager.dashboard.root,
  //       permanent: true,
  //     },
  //   };
  // }
  // if (user.loggedAs === "maintainer") {
  //   return {
  //     redirect: {
  //       destination: _PATH_FRONTEND.maintainerDashboard.root,
  //       permanent: true,
  //     },
  //   };
  // }
  return {
    props: {
      initialUser: user,
      ...translationObj,
    },
  };
}

export default DashboardPage;
