"use client";
import { useParams } from "next/navigation";
import { MantineProviderCustom } from "../../../components/theme/MantineProviderCustom";
import { CheckAcceptInvitationPageView } from "../../../sections/app-router/auth/invitation/CheckAcceptInitationPageView";
import { MeUser } from "../../../types/models/space-model";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "../../../../i18n";
import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import reduxStore from "../../../redux/store";
import { Notifications } from "@mantine/notifications";

export const ClientSideWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ReduxProvider store={reduxStore}>
      <I18nextProvider defaultNS={["common", "notification"]} i18n={i18n}>
        <MantineProviderCustom>
          <Notifications />
          {children}
        </MantineProviderCustom>
      </I18nextProvider>
    </ReduxProvider>
  );
};
