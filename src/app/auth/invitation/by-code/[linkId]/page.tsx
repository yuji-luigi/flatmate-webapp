import axiosInstance, {
  AxiosMeResponse,
  AxiosResDataGeneric,
} from "../../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../../path/path-api";
import { MeUser } from "../../../../../types/models/space-model";
import { cookies, headers } from "next/headers";
import { InvitationByCodePageWrapper } from "./InvitationByCodePageWrapper";
import { redirect } from "next/navigation";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";
import LoadingScreen from "../../../../../components/screen/LoadingScreen";
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

  const pathname = headersInstance.get("x-original-uri") || "/";
  const searchParamsString = new URLSearchParams(searchParams as Record<string, string>).toString();

  const fullUrl = `${protocol}://${host}${pathname}?${searchParamsString}`;
  const redirectUrl = encodeURIComponent(fullUrl || "no");
  const { linkId } = params;

  // try {
  //   redirect("/404");
  //   return;
  if (typeof linkId !== "string") {
    console.error("linkId is not a string");
    return redirect("/404");
  }

  if (jwt && typeof linkId === "string") {
    // call invitations/accept/:linkId with jwt without calling me.
    try {
      await axiosInstance.get<AxiosMeResponse>(apiEndpoint.invitations.acceptByLinkId(linkId), {
        headers: {
          cookie,
        },
      });
      // return router.push(_PATH_FRONTEND.auth.invitationAcceptSuccess(linkId));
      return redirect(_PATH_FRONTEND.auth.invitationAcceptSuccess(linkId));
      // {
      //   redirect: {
      //     destination: _PATH_FRONTEND.auth.invitationAcceptSuccess(linkId),
      //     permanent: false,
      //   },
      // };
    } catch (error) {
      // can be a different user jwt so redirect to invitation login
      // console.error(error);
    }
  }
  const rawInvitation = await axiosInstance.get<AxiosResDataGeneric<InvitationAuth>>(
    apiEndpoint.invitations.byLinkId(linkId)
  );
  if (rawInvitation.data.data.status !== "pending") {
    return redirect(_PATH_FRONTEND.auth.invitationNonValid);
  }
  console.log(_PATH_FRONTEND.auth.invitationLogin);
  // return redirect("/auth/invitation/login");
  return redirect(`${_PATH_FRONTEND.auth.invitationLogin}?redirect=${redirectUrl}`);
  // } catch (error) {
  //   console.error("Error in CheckAcceptInvitationPage", error);
  //   return null;
  // }
}

export default CheckAcceptInvitationPage;
