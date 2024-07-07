import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSidePropsContext } from "next";
import axiosInstance, {
  AxiosMeResponse,
  AxiosResDataGeneric,
} from "../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../path/path-api";
import { MeUser } from "../../../../types/models/space-model";
import { _PATH_FRONTEND } from "../../../../path/path-frontend";
import { InvitationAuth } from "../../../../types/models/invitation-model";
import { CheckAcceptInvitationPageView } from "../../../../sections/app-router/auth/invitation/CheckAcceptInitationPageView";

// server side check
const CheckAcceptInvitationPage = ({
  initialUser,
  params,
}: {
  initialUser: MeUser;
  params: { linkId: string };
}) => {
  return <CheckAcceptInvitationPageView initialUser={initialUser} linkId={params.linkId} />;
};

export default CheckAcceptInvitationPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const translationObj = await serverSideTranslations(context.locale || "it", ["common"], null, [
    "it",
    "en",
  ]);
  const { jwt } = context.req.cookies;
  const redirectUrl = encodeURIComponent(context.req.url || "no");
  const { linkId } = context.query;
  try {
    if (typeof linkId !== "string") {
      console.error("linkId is not a string");
      return {
        redirect: {
          destination: "404",
        },
      };
    }

    if (jwt && typeof context.query.linkId === "string") {
      // call invitations/accept/:linkId with jwt without calling me.
      try {
        await axiosInstance.get<AxiosMeResponse>(
          apiEndpoint.invitations.acceptByLinkId(context.query.linkId),
          {
            headers: {
              cookie: context.req.headers.cookie,
            },
          }
        );
        return {
          redirect: {
            destination: _PATH_FRONTEND.auth.invitationAcceptSuccess(linkId),
            permanent: false,
          },
        };
      } catch (error) {
        // can be a different user jwt so redirect to invitation login
        console.error(error);
      }
    }

    const rawInvitation = await axiosInstance.get<AxiosResDataGeneric<InvitationAuth>>(
      apiEndpoint.invitations.byLinkId(linkId)
    );
    if (rawInvitation.data.data.status !== "pending") {
      return {
        redirect: {
          destination: _PATH_FRONTEND.auth.invitationNonValid,
          permanent: false,
        },
      };
    }

    //NOTE: if next does not provide correct url. this does not work. in dev it worked
    return {
      redirect: {
        destination: `${_PATH_FRONTEND.auth.invitationLogin}?redirect=${redirectUrl}`,
        permanent: false,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
