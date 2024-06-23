import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { apiEndpoint } from "../../../../../path/path-api";
import axiosInstance from "../../../../../utils/axios-instance";
import classes from "./invitation-by-code.module.css";
import { Box, Button, Container, PinInput, Text, Title } from "@mantine/core";
import InvitationByCodeError from "./error";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";

// export const metadata = {
//   title: "Invited to join the team!",
//   description: "Success! You have been invited to join the team!",
// };
type Props = {
  params: { linkId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function InvitationByCodePage({ params, searchParams }: Props) {
  const { linkId } = params;

  async function handleSubmit(formData: FormData) {
    "use server";
    try {
      const res = await axiosInstance.post(
        apiEndpoint.authTokens.verifyPin({ linkId }),
        {
          nonce: formData.get("nonce"),
        },
        { withCredentials: true }
      );
      const setCookieHeader = res.headers["set-cookie"];
      if (setCookieHeader) {
        setCookieHeader.forEach((cookieString) => {
          const [cookieName, cookieValue] = cookieString.split(";")[0].split("=");
          cookies().set(cookieName, cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
          });
        });
      }
      console.log(res);
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Something went wrong.");
    }
    const headersInstance = headers();
    const fullUrl = headersInstance.get("x-forwarded-url");
    const redirectUrl = encodeURIComponent(fullUrl || "no");
    redirect(_PATH_FRONTEND.auth.invitationRegisterWithNonce(redirectUrl));
  }
  return (
    <Container className={classes.container}>
      <Title>You are invited</Title>
      <Text>
        You have been invited to join the team! Please enter the code from the letter to proceed.
      </Text>
      <ErrorBoundary errorComponent={InvitationByCodeError}>
        <Box component="form" action={handleSubmit} mt={24} className={classes["form-group"]}>
          <Text ta="center" fz={24}>
            Enter code here
          </Text>
          <input type="text" style={{ display: "none" }} value={linkId} name="linkId" />
          <PinInput
            name="nonce"
            style={{ justifyContent: "center", display: "flex", flexDirection: "row" }}
            size={"md"}
            length={6}
            type="number"
          />
          <Button type="submit">Submit</Button>
        </Box>
      </ErrorBoundary>
    </Container>
  );
}

// export async function InvitationByCodePage({ params, searchParams }: Props) {
//   const cookieStore = cookies();
//   const jwtCookie = cookieStore.get("jwt");
//   const jwt = jwtCookie ? jwtCookie.value : "";
//   const cookie = jwt ? `jwt=${jwt}` : "";
//   const headersInstance = headers();

//   const fullUrl = headersInstance.get("x-forwarded-url");
//   const redirectUrl = encodeURIComponent(fullUrl || "no");
//   const { linkId } = params;

//   if (typeof linkId !== "string") {
//     console.error("linkId is not a string");
//     return redirect("/404");
//   }

//   const rawInvitation = await axiosInstance.get<AxiosResDataGeneric<InvitationAuth>>(
//     apiEndpoint.invitations.byLinkId(linkId)
//   );
//   if (!isPendingStatus(rawInvitation.data.data.status)) {
//     return redirect(_PATH_FRONTEND.auth.invitationNonValid);
//   }
//   return redirect(`${_PATH_FRONTEND.auth.invitationLogin}?redirect=${redirectUrl}`);
// }

export default InvitationByCodePage;
