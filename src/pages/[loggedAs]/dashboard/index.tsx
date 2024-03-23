import { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "../../../layouts";
import axiosInstance, { AxiosMeResponse } from "../../../utils/axios-instance";
import { CookieContextProvider, useCookieContext } from "../../../context/CookieContext";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";

import { PATH_AUTH } from "../../../path/path-api";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import AdministratorLayout from "../../../layouts/loggedAs/AdministratorLayout";
import { AdminTabPanels } from "../../../layouts/loggedAs/sections-in-tabs/adm-tabs/AdminTabPanels";

const AdministratorDashboardPage = () => {
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();

  useEffect(() => {
    handleSectionData();
  }, []);

  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/home`);
    const { space, maintenances, statistics } = rawRes.data.data || [];
    setCrudDocument({ entity: "statistics", document: statistics });
    setCrudDocument({ entity: "spaces", document: space });
    setCrudDocuments({ entity: "maintenances", documents: maintenances });
  };
  return <AdminTabPanels />;
};
AdministratorDashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AdministratorLayout>{page}</AdministratorLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  const { jwt: jwtToken, loggedAs } = context.req.cookies;
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
  if (user.loggedAs === "Maintainer") {
    return {
      redirect: {
        destination: _PATH_FRONTEND.maintainerDashboard.root,
        permanent: true,
      },
    };
  }
  if (user.loggedAs === "Inhabitant") {
    return {
      redirect: {
        destination: _PATH_FRONTEND.dashboard.root,
        permanent: true,
      },
    };
  }
  return {
    props: {
      initialUser: user,
      initialLoggedAs: loggedAs,
      ...translationObj,
    },
  };
}

export default AdministratorDashboardPage;
