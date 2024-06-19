import React, { ReactElement, useEffect } from "react";
import { Box } from "@mantine/core";
import useRouterWithCustomQuery from "../../hooks/useRouterWithCustomQuery";
import axiosInstance, { AxiosResDataGeneric } from "../../utils/axios-instance";
import { apiEndpoint } from "../../path/path-api";
import Layout from "../../layouts";
import Page from "../../components/Page";

type InvitationLocal = {
  space: { _id: string; name: string };
  _id: string;
};
const SignUpByInvitationPage = () => {
  const { query } = useRouterWithCustomQuery();
  const { redirect } = query;
  const [invitation, setInvitation] = React.useState<null | string | InvitationLocal>("null");

  useEffect(() => {
    if (!redirect) return;
    const linkId = decodeURI(redirect).split("/").pop();
    if (!linkId) {
      console.error("linkId not found");
      return;
    }
    axiosInstance
      .get<AxiosResDataGeneric<InvitationLocal>>(apiEndpoint.auth.getInvitationByLinkId(linkId))
      .then((res) => {
        setInvitation(res.data.data);
      });
  }, [redirect]);

  if (!redirect) return <div>no redirect</div>;
  return (
    <Page title="Complete Invitation">
      <Box>hh</Box>
    </Page>
  );
};

export default SignUpByInvitationPage;
SignUpByInvitationPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
