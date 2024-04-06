import { useRouter } from "next/router";
import { getWordNextFromUrl } from "../../../utils/helpers/helper-functions";
import { UserRegisterPinVerifCard, PinVerifCardProps } from "./UserRegisterPinVerifCard";

type PinVerifCardControllerProps = PinVerifCardProps;

export const PinVerifCardController = ({ setPinOk }: PinVerifCardControllerProps) => {
  const router = useRouter();
  const section = getWordNextFromUrl(router.asPath, "auth-tokens");
  switch (section) {
    case "users":
      return <UserRegisterPinVerifCard setPinOk={setPinOk} />;
    default:
      return <>Pin verif card controller</>;
  }
};
