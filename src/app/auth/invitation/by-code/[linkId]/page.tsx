import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../../path/path-api";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";
import {
  InvitationAuth,
  isPendingStatus,
  pendingInvitationStatuses,
} from "../../../../../types/models/invitation-model";

export const metadata = {
  title: "Success! You have been invited to join the team!",
  description: "Success! You have been invited to join the team!",
};
type Props = {
  params: { linkId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function CheckAcceptInvitationPage({ params, searchParams }: Props) {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("jwt");
  const jwt = jwtCookie ? jwtCookie.value : "";
  const cookie = jwt ? `jwt=${jwt}` : "";
  const headersInstance = headers();

  const fullUrl = headersInstance.get("x-forwarded-url");
  const redirectUrl = encodeURIComponent(fullUrl || "no");
  const { linkId } = params;

  if (typeof linkId !== "string") {
    console.error("linkId is not a string");
    return redirect("/404");
  }

  const rawInvitation = await axiosInstance.get<AxiosResDataGeneric<InvitationAuth>>(
    apiEndpoint.invitations.byLinkId(linkId)
  );
  if (!isPendingStatus(rawInvitation.data.data.status)) {
    return redirect(_PATH_FRONTEND.auth.invitationNonValid);
  }
  return redirect(`${_PATH_FRONTEND.auth.invitationLogin}?redirect=${redirectUrl}`);
}

export default CheckAcceptInvitationPage;
