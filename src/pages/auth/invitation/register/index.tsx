import React, { ReactElement } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "@mantine/form";
import Layout from "../../../../layouts";
import { useLocale } from "../../../../../hooks/useLocale";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { PATH_IMAGE } from "../../../../lib/image-paths";
import Page from "../../../../components/Page";
import axiosInstance from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { sleep } from "../../../../utils/helpers/helper-functions";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const InvitationLoginPage = () => {
  const [apiError, setApiError] = React.useState("");
  const { push, locale } = useRouter();
  const { t } = useLocale();
  const { t: tn } = useLocale("notification");
  const { t: ta } = useLocale("auth");
  const { query } = useRouterWithCustomQuery();
  const decodedRedirectStr = decodeURIComponent(query.redirect as string);
  const withNonce = query.withNonce === "true";
  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      password2: "",
      status: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      surname: (value) => (!value.trim() ? t("Surname is required") : null),
      name: (value) => (!value.trim() ? t("Name is required") : null),
      password: (value) => (!value.trim() ? t("Password is required") : null),
      password2: (value) => {
        if (value !== form.values.password) {
          return t("Passwords do not match");
        }
        return null;
      },
    },
    clearInputErrorOnChange: true,
    onValuesChange: (values) => {
      setApiError("");
    },
  });

  const linkId = query.redirect?.split("/").pop();
  //
  const handleSubmit = async (values: (typeof form)["values"]) => {
    form.setValues({ ...values, status: "loading" });
    if (typeof linkId !== "string") {
      throw new Error("Something went wrong. (no redirect parameter)");
    }

    try {
      const { status, ...dto } = values;
      // switch the request based on the withNonce query parameter
      // case with nonce call endpoint where email verification is needed
      // The endpoint must be the same. handle registration with email verification in the backend for each userType.
      if (withNonce) {
        await axiosInstance.post(apiEndpoint.invitations.preRegisterWithEmailVerification(linkId), {
          ...dto,
          locale,
        });
        form.setValues({ ...values, status: "" });
        push(_PATH_FRONTEND.auth.emailVerificationPending);
        return;
      }

      await axiosInstance.post(apiEndpoint.invitations.acceptByRegister(linkId), dto);
      await sleep(1000);
      // form.setValues({ ...values, status: "" });
      push(_PATH_FRONTEND.auth.invitationAcceptSuccess(linkId));
    } catch (error: any) {
      await sleep(1000);
      form.setValues({ ...values, status: "" });
      setApiError(error.message || error);
    }
  };
  return (
    <Page title={t("Invited!")} className="login-page-container grid-center">
      <Stack>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Card data-page-loading={form.values.status === "loading"} className="login-card">
            <Group justify="space-between">
              <Stack flex={1} gap={0}>
                <Text fz={24} fw="bold">
                  {t("Register to Flatmates")}
                </Text>
                <Text fz={14} fw="bold">
                  {ta("registerToCompleteInvite")}
                </Text>
              </Stack>
              <Image src={PATH_IMAGE.flatmateLogo1} alt="Flatmates" height={80} width={80} />
            </Group>
            <Box className="form-grid " mb={24}>
              {apiError && (
                <Alert title="Error" className="column-2" color="red">
                  {tn(apiError)}
                </Alert>
              )}
              <TextInput
                className="column-1"
                aria-required
                {...form.getInputProps("name")}
                label={t("Name")}
              />
              <TextInput
                className="column-1"
                aria-required
                {...form.getInputProps("surname")}
                label={t("Surname")}
              />
              <TextInput
                className="column-2"
                aria-required
                key={form.key("email")}
                {...form.getInputProps("email")}
                label={t("Email")}
              />
              <PasswordInput
                aria-required
                {...form.getInputProps("password")}
                label={t("Password")}
              />
              <PasswordInput
                type="password"
                aria-required
                {...form.getInputProps("password2")}
                label={t("Confirm password")}
              />
            </Box>
            <Button type="submit" loading={form.values.status === "loading"}>
              {t("Submit")}
            </Button>
            <Text ta="end" fz={14} fw="bold">
              {t("If you have an account.")}{" "}
              <Link
                style={{
                  color: "var(--mantine-color-primary)",
                }}
                href={{
                  pathname: _PATH_FRONTEND.auth.invitationLogin,
                  query: {
                    redirect: query.redirect,
                  },
                }}
              >
                {t("Login")}
              </Link>
            </Text>
          </Card>
        </form>
      </Stack>
    </Page>
  );
};

export default InvitationLoginPage;
InvitationLoginPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(
    context.locale || "it",
    ["notification", "common", "auth"],
    null,
    ["it", "en"]
  );

  // 1. check for auth-token cookie
  // case cookie is present then authorize
  if (context.query.withNonce === "true") {
    try {
      await axiosInstance.get(apiEndpoint.authTokens.checkByCookie, {
        headers: {
          cookie: context.req.headers.cookie,
        },
        withCredentials: true,
      });
      return {
        props: {
          ...translationObj,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: _PATH_FRONTEND.auth.logout,
          permanent: false,
        },
      };
    }
  }

  return {
    props: {
      ...translationObj,
    },
  };
}
