"use client";
import { useParams } from "next/navigation";
import { MantineProviderCustom } from "../../../components/theme/MantineProviderCustom";
import { CheckAcceptInvitationPageView } from "../../../sections/app-router/auth/invitation/CheckAcceptInitationPageView";
import { MeUser } from "../../../types/models/space-model";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "../../../../i18n";
import { ReactNode } from "react";

export const ClientSideWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <MantineProviderCustom>{children}</MantineProviderCustom>
    </I18nextProvider>
  );
};
