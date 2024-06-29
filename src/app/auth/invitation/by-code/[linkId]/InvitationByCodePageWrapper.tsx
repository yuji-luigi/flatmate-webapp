"use client";
import { useParams } from "next/navigation";
import { MantineProviderCustom } from "../../../../../components/theme/MantineProviderCustom";
import { CheckAcceptInvitationPageView } from "../../../../../sections/app-router/auth/invitation/CheckAcceptInitationPageView";
import { MeUser } from "../../../../../types/models/space-model";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "../../../../../../i18n";

export const InvitationByCodePageWrapper = ({ initialUser }: { initialUser: MeUser }) => {
  const { linkId } = useParams() as { linkId: string };
  return (
    <I18nextProvider i18n={i18n}>
      <MantineProviderCustom>
        <CheckAcceptInvitationPageView initialUser={initialUser} linkId={linkId} />
      </MantineProviderCustom>
    </I18nextProvider>
  );
};
