import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../../path/path-api";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";
import { InvitationAuth } from "../../../../../types/models/invitation-model";

export const metadata = {
  title: "Success! You have been invited to join the team!",
  description: "Success! You have been invited to join the team!",
};
type Props = {
  params: { linkId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   // const id = params.id;
//   // fetch data
//   const todo = await fetch(`https://jsonplaceholder.typicode.com/todos/1`).then((res) =>
//     res.json()
//   );

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: todo.title,
//     openGraph: {
//       images: ["/some-specific-page-image.jpg", ...previousImages],
//     },
//   };
// }

// server side check
export async function CheckAcceptInvitationPage({ params, searchParams }: Props) {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("jwt");
  const jwt = jwtCookie ? jwtCookie.value : "";
  const cookie = jwt ? `jwt=${jwt}` : "";
  const headersInstance = headers();
  const host = headersInstance.get("host");
  const protocol = headersInstance.get("x-forwarded-proto") || "http";

  const fullUrl = headersInstance.get("x-forwarded-url");
  const redirectUrl = encodeURIComponent(fullUrl || "no");
  const { linkId } = params;

  if (typeof linkId !== "string") {
    console.error("linkId is not a string");
    return redirect("/404");
  }

  // if (jwt && typeof linkId === "string") {
  // await axiosInstance.get<AxiosMeResponse>(apiEndpoint.invitations.acceptByLinkId(linkId), {
  //   headers: {
  //     cookie,
  //   },
  // });
  // .then((_) => {
  //   return redirect(_PATH_FRONTEND.auth.invitationAcceptSuccess(linkId));
  // })
  // .catch((error) => {
  //   console.error("error", error);
  // });
  // }
  const rawInvitation = await axiosInstance.get<AxiosResDataGeneric<InvitationAuth>>(
    apiEndpoint.invitations.byLinkId(linkId)
  );
  if (rawInvitation.data.data.status !== "pending") {
    return redirect(_PATH_FRONTEND.auth.invitationNonValid);
  }
  return redirect(`${_PATH_FRONTEND.auth.invitationLogin}?redirect=${redirectUrl}`);
}

export default CheckAcceptInvitationPage;
