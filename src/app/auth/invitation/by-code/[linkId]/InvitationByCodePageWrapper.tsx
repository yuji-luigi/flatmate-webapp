"use client";
import { MantineProviderCustom } from "../../../../../components/theme/MantineProviderCustom";
import { CheckAcceptInvitationPageView } from "../../../../../sections/app-router/auth/invitation/CheckAcceptInitationPageView";
import { MeUser } from "../../../../../types/models/space-model";

export const InvitationByCodePageWrapper = ({ initialUser }: { initialUser: MeUser }) => {
  return (
    <MantineProviderCustom>
      <CheckAcceptInvitationPageView initialUser={initialUser} />
    </MantineProviderCustom>
  );
};
