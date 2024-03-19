import React, { FC, JSXElementConstructor, ReactElement } from "react";
import { getEntityFromUrl, getWordNextFromUrl } from "../../../utils/helpers/helper-functions";
import { useRouter } from "next/router";
import { UserRegisterPinVerifCard, PinVerifCardProps } from "./UserRegisterPinVerifCard";
// interface ComponentPropsMap {
//   users: PinVerifCardProps;
//   maintenainers: {str: string}
// }
type PinVerifCardControllerProps = PinVerifCardProps;

export const PinVerifCardController = ({ setPinOk }: PinVerifCardControllerProps) => {
  const router = useRouter();
  const section = getWordNextFromUrl(router.asPath, "auth-tokens");
  switch (section) {
    case "users":
      return <UserRegisterPinVerifCard setPinOk={setPinOk} />;
    default:
      return <>'Pin verif card controller';</>;
  }
};
