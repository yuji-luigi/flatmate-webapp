import { FormEvent, ReactElement, useEffect, useState } from "react";
import { Alert, Button, Card, Stack, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { useForm } from "@mantine/form";
import Layout from "../../../layouts";
import { useLocale } from "../../../../hooks/useLocale";
import { _PATH_FRONTEND } from "../../../path/path-frontend";
import useRouterWithCustomQuery from "../../../hooks/useRouterWithCustomQuery";
import { useFetchCrudDocument } from "../../../hooks/useGetCrudDocument";
import { _PATH_API } from "../../../path/path-api";
import { useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import { InvitationAuth } from "../../../types/models/invitation-model";
import axiosInstance from "../../../utils/axios-instance";
import Page from "../../../components/Page";

const InvitationLoginPage = () => {
  const { t } = useLocale();
  const { query, push } = useRouterWithCustomQuery();
  const [formError, setFormError] = useState("");
  const form = useForm({
    initialValues: { email: "", password: "" },
  });
  const linkId = query.redirect?.split("/").pop();
  const { crudDocument, crudStatus } = useCrudSelectors<InvitationAuth>("invitations");
  useFetchCrudDocument({
    endpoint: _PATH_API.auth.getInvitationByLinkId(linkId || ""),
    entity: linkId && "invitations",
  });

  useEffect(() => {
    setFormError("");
  }, [form.values]);

  if (crudStatus === "loading" || !linkId) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.redirect) {
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
          {formError && (
            <Alert title="Error" color="red">
              {formError}
            </Alert>
          )}
          <Text fz={32} fw="bold">
            {t("You are invited")}
          </Text>
          <Text ta="left" fz={16} fw="bold">
            {crudDocument?.createdBy.email} {t("is inviting you to join Flatmates.")}
          </Text>
          <Text ta="left" fz={16} fw="bold">
            {t("Please login to continue.")}
          </Text>

          <Stack gap={8} mb={24}>
            <TextInput {...form.getInputProps("email")} label="email" />
            <TextInput {...form.getInputProps("password")} label="password" />
          </Stack>
          <Button ml="auto" type="submit">
            {t("Login")}
          </Button>
          <Text ta="end" fz={14} fw="bold">
            {t('If you don"t have an account.')}{" "}
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
