import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next/types";
import SystemAdminDashboardLayout from "../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import axiosInstance, { AxiosMeResponse } from "../../utils/axios-instance";
import { _PATH_API } from "../../path/path-api";
import useAuth from "../../../hooks/useAuth";
import { SystemTop } from "../../sections/system";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";

const SystemAdminHome = () => {
  const { user } = useAuth();
  const { fetchCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    fetchCrudDocuments({ entity: "property_manager" });
    fetchCrudDocuments({ entity: "maintainer" });
    fetchCrudDocuments({ entity: "inhabitant" });
  }, []);
  return <SystemTop />;
};

SystemAdminHome.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout onlySuperAdmin>{page}</SystemAdminDashboardLayout>;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  try {
    const { cookies } = context.req;

    const { cookie } = context.req.headers;
    const rawMe = await axiosInstance.get<AxiosMeResponse>(_PATH_API.auth.me, {
      headers: {
        cookie,
      },
    });
    if (rawMe.data.user.isSuperAdmin) {
      return {
        props: {
          ...translationObj,
          initialUser: rawMe.data.user,
        },
      };
    }

    throw new Error("not authorized");
  } catch (error: any) {
    console.error(error.stack);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
}

export default SystemAdminHome;
