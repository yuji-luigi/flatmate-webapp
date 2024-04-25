import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { ReactElement, useEffect } from "react";
import { GetServerSidePropsContext } from "next/types";
import SystemAdminDashboardLayout from "../../layouts/system-admin-dashboard-layout/SystemAdminDashboardLayout";
import axiosInstance from "../../utils/axios-instance";
import { _PATH_API } from "../../path/path-api";
import useAuth from "../../../hooks/useAuth";
import { SystemTop } from "../../sections/system";
import { useCrudSliceStore } from "../../redux/features/crud/crudSlice";

const SystemAdminHome = () => {
  const { user } = useAuth();
  const { fetchCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    fetchCrudDocuments({ entity: "property_manager" });
    fetchCrudDocuments({ entity: "maintainers" });
    fetchCrudDocuments({ entity: "inhabitant" });
  }, []);
  return <SystemTop />;
};

SystemAdminHome.getLayout = function getLayout(page: ReactElement) {
  return <SystemAdminDashboardLayout>{page}</SystemAdminDashboardLayout>;
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  try {
    const { cookies } = context.req;
    if (!cookies.spaceId) {
      throw new Error("spaceId cookie not found");
    }
    if (cookies?.spaceId) {
      const { cookie } = context.req.headers;
      const res = await axiosInstance.get(_PATH_API.auth.systemAdminCheck(cookies.spaceId), {
        headers: {
          cookie,
        },
      });
      if (res.status === 200) {
        return {
          props: {
            ...translationObj,
          },
        };
      }
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
