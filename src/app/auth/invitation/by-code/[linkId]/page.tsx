import axiosInstance from "../../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../../path/path-api";
import { MeUser } from "../../../../../types/models/space-model";
import { cookies } from "next/headers";
import { InvitationByCodePageWrapper } from "./InvitationByCodePageWrapper";

// server side check
const CheckAcceptInvitationPage = async () => {
  const cookieStore = cookies();
  const jwtCookie = cookieStore.get("jwt");
  const token = jwtCookie ? jwtCookie.value : "";

  const response = await axiosInstance
    .get<MeUser>(apiEndpoint.auth.me, {
      withCredentials: true,
      headers: {
        cookie: `jwt=${token}`,
      },
    })
    .catch((error) => {
      console.error("Error in CheckAcceptInvitationPage", error);
      return { data: {} };
    });

  return <InvitationByCodePageWrapper initialUser={response.data} />;
};

export default CheckAcceptInvitationPage;
