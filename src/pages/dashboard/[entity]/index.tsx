import { ReactElement } from "react";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../../layouts";
import CrudPageView from "../../../components/crud/CrutPageView";

const CrudPage = () => {
  return <CrudPageView />;
};

CrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  return {
    props: {
      ...translationObj,
    },
  };
}

export default CrudPage;
