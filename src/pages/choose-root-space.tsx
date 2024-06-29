import { ReactElement } from "react";
import useSWR from "swr";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import { PATH_CLIENT, _PATH_FRONTEND } from "../path/path-frontend";
import axiosInstance, { AxiosMeResponse, AxiosResDataGeneric } from "../utils/axios-instance";
import { apiEndpointRootsEnum, PATH_AUTH, apiEndpoint } from "../path/path-api";

import Layout from "../layouts";
import { SpaceModel, UserModel } from "../types/models/space-model";
import { ChooseSpaceSection } from "../sections/login_signup/choose-space/ChooseSpaceSection";
import LoadingScreen from "../components/screen/LoadingScreen";
import useAuth from "../../hooks/useAuth";
import { NoSpacesFound } from "../sections/login_signup/choose-space/NoSpacesFound";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  try {
    const { locale } = context;
    const { loggedAs, jwt: jwtToken } = context.req.cookies;
    if (!jwtToken) {
      return {
        redirect: {
          destination: _PATH_FRONTEND.auth.guardToLogin,
          permanent: true,
        },
      };
    }

    const rawRes = await axiosInstance.get<AxiosMeResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/${PATH_AUTH.me}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    const { data } = rawRes;
    const { user } = data;
    if (!user) {
      return {
        props: {
          ...translationObj,
          initialUser: null,
        },
      };
    }
    if (!user.isSuperAdmin && user.loggedAs === "inhabitant") {
      return {
        props: {
          ...translationObj,
          initialUser: user,
        },
      };
    }

    return {
      redirect: {
        destination: _PATH_FRONTEND.pathAfterLogin,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/500",
      },
    };
  }
}
export const fetchSpaceSelections = async (userId?: string | null) => {
  const res = await axiosInstance.get<AxiosResDataGeneric<SpaceModel[]>>(
    apiEndpointRootsEnum.getSpaceSelections
  );
  return res.data?.data;
};

const ChooseRootSpacePage = (props: { initialUser?: UserModel }) => {
  const { initialUser } = props;
  const router = useRouter();
  const {
    data: rootSpaces,
    error,
    isLoading,
  } = useSWR<SpaceModel[] | null, AxiosError>(initialUser?._id, () =>
    fetchSpaceSelections(initialUser?._id)
  );
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  if (!rootSpaces?.length) {
    return <NoSpacesFound />;
  }

  return <ChooseSpaceSection spaces={rootSpaces} />;
};

// ChooseRootSpacePage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;

export default ChooseRootSpacePage;
