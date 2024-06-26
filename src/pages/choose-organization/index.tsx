import React, { ReactElement, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { _PATH_FRONTEND } from "../../path/path-frontend";
import axiosInstance, { AxiosMeResponse } from "../../utils/axios-instance";
import { PATH_AUTH, apiEndpoint } from "../../path/path-api";
import Layout from "../../layouts";
import {
  MeUser,
  OrganizationModel,
  Role,
  SpaceModel,
  UserModel,
} from "../../types/models/space-model";
import { CardForListSmall } from "../../components/card/CardForListSmall";
import classes from "./chooose-organization-page.module.css";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { locale } = context;
    const { jwt: jwtToken } = context.req.cookies;
    if (!jwtToken) {
      return {
        redirect: {
          destination: "/500",
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
      throw new Error("Invalid access");
    }
    // if (loggedAs === 'inhabitant' || loggedAs === 'maintainer') {
    //   return {
    //     redirect: {
    //       destination: _PATH_FRONTEND.auth.chooseSpace,
    //       permanent: true,
    //     },
    //   };
    // }
    return {
      props: {
        ...(await serverSideTranslations(locale || "it", ["common"])),
        initialUser: user,
      },
    };
  } catch (error) {
    return {
      props: {
        initialUser: null,
      },
    };
  }
}
const ChooseOrganizationPage = (props: { initialUser: MeUser }) => {
  const { initialUser } = props;
  const [organizations, setOrganizations] = React.useState<OrganizationModel[] | SpaceModel[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!initialUser) return;
    axiosInstance.get(`${apiEndpoint.organizations.selections}`).then((res) => {
      setOrganizations(res.data.data);
    });
  }, [initialUser?.loggedAs]);

  const title = initialUser?.isSuperAdmin ? "Choose organization" : "Choose space";
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Text variant="text" fz={36} fw={600} ta="center">
          {title}
        </Text>
      </div>

      <Box className={classes.list}>
        <CardForListSmall
          title="All organizations"
          href={{
            pathname: _PATH_FRONTEND.dashboard.root,
            query: {
              tab: "dashboard",
            },
          }}
          image=""
        />

        {organizations.map((organization) => (
          <CardForListSmall
            key={organization._id}
            title={`• ${organization.name}`}
            description={organization.address}
            // subtitle={organization.admins[0]?.name || ''}
            href={{
              pathname: _PATH_FRONTEND.auth.chooseRootSpace,
              query: { organizationId: organization._id },
            }}
            image=""
          />
        ))}
        {organizations.length === 0 && (
          <>
            <Text variant="text" fz={24} ta="center">
              No organizations found
            </Text>
            <Link href={_PATH_FRONTEND.homepage.root}>Go back to home</Link>
          </>
        )}
      </Box>
    </div>
  );
};
ChooseOrganizationPage.getLayout = (page: ReactElement) => <Layout variant="main">{page}</Layout>;
export default ChooseOrganizationPage;
