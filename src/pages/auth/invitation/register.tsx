import React, { FormEvent, ReactElement } from "react";
import { Alert, Box, Button, Card, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useForm } from "@mantine/form";
import Layout from "../../../layouts";
import { useLocale } from "../../../../hooks/useLocale";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import { PATH_IMAGE } from "../../../lib/image-paths";
import Page from "../../../components/Page";
import axiosInstance from "../../../utils/axios-instance";
import { _PATH_API } from "../../../path/path-api";
import { sleep } from "../../../utils/helpers/helper-functions";

const InvitationLoginPage = () => {
  const { t } = useLocale();
  const { query } = useRouterWithCustomQuery();
  const form = useForm({
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      status: "",
      error: "",
    },
  });
  const linkId = query.redirect?.split("/").pop();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (typeof linkId !== "string") {
      throw new Error("Something went wrong. (no redirect parameter)");
    }
    form.setValues({ ...form.values, status: undefined });
    try {
      throw new Error("Something went wrong. (no redirect parameter)");
      await axiosInstance.post(_PATH_API.invitations.acceptByRegister(linkId), form.values);

      form.setValues({ ...form.values, status: "loading" });
      await sleep(1000);
      form.setValues({ ...form.values, status: "" });
    } catch (error: any) {
      form.setValues({ ...form.values, error: error.message || error });
    }
  };
  return (
    <Page title={t("Invited!")} className="main-container grid-center">
      <Stack>
        <form onSubmit={handleSubmit}>
          <Card data-page-loading={form.values.status === "loading"} className="login-card">
            <Text ta="center" fz={24} fw="bold">
              {t("Register to Flatmates")}
              <Image src={PATH_IMAGE.flatmateLogo1} alt="Flatmates" height={80} width={80} />
            </Text>
            <Stack gap={8} mb={24}>
              {form.values.error && (
                <Alert title="Error" color="red">
                  {form.values.error}
                </Alert>
              )}
              <TextInput aria-required {...form.getInputProps("name")} label={t("Name")} />
              <TextInput aria-required {...form.getInputProps("surname")} label={t("Surname")} />
              <TextInput
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
                {...form.getInputProps("password")}
                label={t("Confirm password")}
              />
            </Stack>
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
