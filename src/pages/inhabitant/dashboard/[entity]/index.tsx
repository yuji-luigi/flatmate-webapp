import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { ReactElement } from "react";
import Layout from "../../../../layouts";
import CrudPageView from "../../../../components/crud/CrudPageView";

const PropertyManagerCrudPage = () => {
  return <CrudPageView />;
};

export default PropertyManagerCrudPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(
    context.locale || "it",
    ["common", "crud-section"],
    null,
    ["it", "en"]
  );
  return {
    props: {
      ...translationObj,
    },
  };
}

PropertyManagerCrudPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
