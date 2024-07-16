import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { _PATH_FRONTEND, PATH_AFTER_LOGIN } from "../../path/path-frontend";
import { isUserType, UserType } from "../../lib/enums";
import LoadingScreen from "../../components/screen/LoadingScreen";

const DashboardRootPage = () => {
  const { name, value: loggedAs } = cookies().get("loggedAs") || {};
  if (!isUserType(loggedAs)) return;
  redirect(PATH_AFTER_LOGIN(loggedAs));
  return <LoadingScreen />;
};

export default DashboardRootPage;
