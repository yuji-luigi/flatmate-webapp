import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { ReactElement } from "react";
import Layout from "../../../../layouts";
import CrudDataTablePageView from "../../../../components/crud/CrutDatatablePageView";

const PropertyManagerCrudPage = () => {
  return <CrudDataTablePageView />;
};

export default PropertyManagerCrudPage;

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

PropertyManagerCrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
