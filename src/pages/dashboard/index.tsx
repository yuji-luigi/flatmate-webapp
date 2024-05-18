import { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Layout from "../../layouts";
import axiosInstance, { AxiosMeResponse } from "../../utils/axios-instance";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";
import { PATH_AUTH } from "../../path/path-api";
import { DashboardTabPanels } from "../../layouts/dashboard/sections-in-tabs/tabs/DashboardRootTabPanels";
import { toTitleCase } from "../../lib/toTitleCase";
import { MeUser } from "../../types/models/space-model";
import useAuth from "../../../hooks/useAuth";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import { AllModels } from "../../types/models/allmodels";

const DashboardPage = ({ initialUser }: { initialUser: MeUser }) => {
  const { setCrudDocument, setCrudDocuments } = useCrudSliceStore();
  const { updateUser } = useAuth();

  useEffect(() => {
    handleSectionData();
    if (initialUser) {
      updateUser(initialUser);
    }
  }, []);

  const handleSectionData = async () => {
    const rawRes = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/home`);
    const { space, maintainers, maintenances, threads, statistics } = rawRes.data.data || [];

    setCrudDocument({ entity: "statistics", updatedDocument: statistics });
    setCrudDocument({ entity: "spaces", updatedDocument: space });
    setCrudDocuments({
      entity: "maintenances",
      documents: maintenances as AllModels[],
      totalDocuments: maintenances.length,
    });
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
  try {
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
    return {
      props: {
        initialUser: user,
        ...translationObj,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default DashboardPage;
