import { FormEvent, ReactElement, useEffect, useState } from "react";
import { Alert, Button, Card, Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import Layout from "../../../layouts";
import { useLocale } from "../../../../hooks/useLocale";
import { _PATH_FRONTEND, FRONTEND_ROOT, PATH_AFTER_LOGIN } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import { apiEndpoint } from "../../../path/path-api";
import axiosInstance from "../../../utils/axios-instance";
import Page from "../../../components/Page";
import { PATH_IMAGE } from "../../../lib/image-paths";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useAuth from "../../../../hooks/useAuth";
import { NotificationPageView } from "../../../components/page-components/NotificationPageView";
import { UserType } from "../../../lib/enums";

const InvitationLoginPage = () => {
  const { t, locale } = useLocale();
  const { t: tn } = useLocale("notification");
  const [success, setSuccess] = useState<UserType | false>(false);
  const { query, push } = useRouterWithCustomQuery();
  const { login } = useAuth();
  const [formError, setFormError] = useState("");
  const router = useRouterWithCustomQuery();
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
      // TODO:(?Not sure)  1, call normal login. 2. get jwt. 3. come back to this page. 4. call acceptByLogin. 5. <success>log user in. <fail> show error.
      // NOW:   1. call acceptByLogin. 2. <success> redirect to query.redirect. <fail> show error.
      // NOTE: linkId to find invitation. the invitation in backend controls the operation all in serverside.
      const rawRes = await axiosInstance.post(
        apiEndpoint.invitations.acceptByLogin(linkId),
        form.values
      );
      const { userType } = rawRes.data.data;
      await login(form.values.email, form.values.password, userType);
      setSuccess(userType);
      // push(PATH_AFTER_LOGIN(userType));
    } catch (error: any) {
      setFormError(error.message || error);
    }
  };
  if (success) {
    return (
      <Page title={t("Invitation completed")}>
        <NotificationPageView
          title={t("Invitation completed. You will be redirected to your dashboard.")}
          description={t(
            "You have successfully accepted the invitation. If you are not redirected, click the button below."
          )}
          imageUrl={PATH_IMAGE.loading}
          redirectOption={{
            router,
            sec: 5,
            redirectPath: _PATH_FRONTEND.dashboard.home(success),
          }}
          CTA={
            <Button onClick={() => push(_PATH_FRONTEND.dashboard.home(success))}>
              {t("Go now")}
            </Button>
          }
        />
      </Page>
    );
  }
  return (
    <Page title={t("Invited!")} className="login-page-container grid-center">
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
