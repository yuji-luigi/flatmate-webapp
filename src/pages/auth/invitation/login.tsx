import { FormEvent, ReactElement, useEffect, useState } from "react";
import { Alert, Button, Card, Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import Layout from "../../../layouts";
import { useLocale } from "../../../../hooks/useLocale";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import { _PATH_API } from "../../../path/path-api";
import axiosInstance from "../../../utils/axios-instance";
import Page from "../../../components/Page";
import { PATH_IMAGE } from "../../../lib/image-paths";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const InvitationLoginPage = () => {
  const { t, locale } = useLocale();
  const { t: tn } = useLocale("notification");
  console.log({ locale });
  const { query, push } = useRouterWithCustomQuery();
  const [formError, setFormError] = useState("");
  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (!value.trim() ? t("Password is required") : null),
    },
  });
  const linkId = query.redirect?.split("/").pop();

  useEffect(() => {
    setFormError("");
  }, [form.values]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.redirect || !linkId) {
      throw new Error("Something went wrong. (no redirect parameter)");
    }
    try {
      await axiosInstance.post(_PATH_API.invitations.acceptByLogin(linkId), form.values);
      push(query.redirect);
    } catch (error: any) {
      setFormError(error.message || error);
    }
  };

  return (
    <Page title={t("Invited!")} className="main-container grid-center">
      <form onSubmit={handleSubmit}>
        <Card className="login-card">
          <Group justify="space-between">
            <Stack flex={1} gap={0}>
              <Text fz={24} fw="bold">
                {t("You are invited")}
              </Text>
              <Text fz={14} fw="bold">
                {t("Please login to continue.")}
              </Text>
            </Stack>
            <Image src={PATH_IMAGE.flatmateLogo1} alt="Flatmates" height={80} width={80} />
          </Group>

          {formError && (
            <Alert title="Error" color="red">
              {tn(`${formError}`)}
            </Alert>
          )}

          <Stack gap={8} mb={24}>
            <TextInput {...form.getInputProps("email")} label="email" />
            <PasswordInput {...form.getInputProps("password")} label="password" />
          </Stack>
          <Button ml="auto" type="submit">
            {t("Login")}
          </Button>
          <Text ta="end" fz={14} fw="bold">
            {t(`If you don't have an account. Please`)}{" "}
            <Link
              style={{
                color: "var(--mantine-color-primary)",
              }}
              href={{
                pathname: _PATH_FRONTEND.auth.invitationRegister,
                query: { redirect: query.redirect },
              }}
            >
              {t("Register")}
            </Link>
          </Text>
        </Card>
      </form>
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
    ["notification", "common"],
    null,
    ["it", "en"]
  );
  return {
    props: {
      ...translationObj,
    },
  };
}
