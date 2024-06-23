import { cookies, headers } from "next/headers";
import { InvitationByQrcodeView } from "../../../../../sections/app-router/auth/invitation/by-code/InvitationByQrcodeView";
import { apiEndpoint } from "../../../../../path/path-api";
import axiosInstance from "../../../../../utils/axios-instance";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";
import { redirect } from "next/navigation";

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

  const headersInstance = headers();
  const fullUrl = headersInstance.get("x-forwarded-url");
  const redirectUrl = encodeURIComponent(fullUrl || "no");
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
    redirect(_PATH_FRONTEND.auth.invitationRegisterWithNonce(redirectUrl));
  }
  return <InvitationByQrcodeView params={params} handleSubmit={handleSubmit} />;
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
