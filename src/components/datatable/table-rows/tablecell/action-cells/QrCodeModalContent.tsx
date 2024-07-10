import { Stack, Button, Text, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import { hideNotification, showNotification } from "@mantine/notifications";
import {
  AuthTokenModel,
  HiddenAuthTokenInterface,
} from "../../../../../types/models/auth-token-model";
import { apiEndpoint } from "../../../../../path/path-api";
import axiosInstance, { AxiosResDataGeneric } from "../../../../../utils/axios-instance";
import { MongooseBaseModel } from "../../../../../types/models/mongoose-base-model";
import {
  ERROR_NOTIFICATION,
  NOTIFICATIONS,
} from "../../../../../data/showNofification/notificationObjects";
import { QrCodeView } from "../../../../qr-code/QrCodeViewRegular";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { sleep } from "../../../../../utils/helpers/helper-functions";
import { useLocale } from "../../../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../../../hooks/useRouterWithCustomQuery";
import { TFunction } from "next-i18next";
import { pendingInvitationStatuses } from "../../../../../types/models/invitation-model";

export const QrCodeModalContent = ({
  authToken,
  row,
}: {
  authToken: HiddenAuthTokenInterface;
  row: MongooseBaseModel;
}) => {
  const [authTokenState, setAuthTokenState] = useState<HiddenAuthTokenInterface>(authToken);
  const { closeModal } = useCustomModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    query: { entity: _entity },
  } = useRouterWithCustomQuery();
  const { t } = useLocale();
  const sendEmailToUser = async () => {
    try {
      if (_entity === "users") {
        setIsLoading(true);
        showNotification(NOTIFICATIONS.LOADING.email);
        const rawResult = await axiosInstance.get(
          apiEndpoint[_entity].sendTokenEmail({ _id: row._id })
        );
        await sleep(700);
        setIsLoading(false);
        hideNotification(NOTIFICATIONS.LOADING.email.id);
        showNotification(NOTIFICATIONS.SUCCESS.email);
        closeModal();
      }
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
      await sleep(700);
      showNotification(NOTIFICATIONS.ERROR.general({ data: error.message || error }));
    }
  };
  let qrCodeView = <Text>Qrcode is not available</Text>;
  let sendText = "send new QR-code to user";

  if (authTokenState?.active) {
    qrCodeView = <QrCodeView authToken={authTokenState} />;
    sendText = "Send QR-code mail";
  }

  return (
    <>
      {qrCodeView}
      <Stack gap={16} px={80} mt={24}>
        {/* <Button onClick={sendEmailToUser}>{sendText}</Button> */}
        <RenewButton
          authToken={authTokenState}
          setAuthTokenState={setAuthTokenState}
          t={t}
          row={row}
        />
        <Button onClick={closeModal} variant="subtle">
          {t("Close")}
        </Button>
        <LoadingOverlay visible={isLoading} />
      </Stack>
    </>
  );
};

function RenewButton({
  t,
  authToken,
  setAuthTokenState,
  row,
}: {
  t: TFunction;
  authToken: AuthTokenModel;
  setAuthTokenState: (authToken: AuthTokenModel) => void;
  row: MongooseBaseModel;
}) {
  const [loading, setLoading] = useState(false);
  const callRenewApi = async () => {
    setLoading(true);
    try {
      if (!authToken) {
        // re-generate the authToken
        const rawAuthToken = await axiosInstance.post(
          apiEndpoint.authTokens.invitationUnit({ unitId: row._id })
        );
        setAuthTokenState(rawAuthToken.data.data);
        showNotification(NOTIFICATIONS.SUCCESS.genericFn({ title: t("New Qr-code created!") }));
        return;
      }
      await axiosInstance.post(
        apiEndpoint.authTokens.renew,
        { space: row.space._id },
        { params: { _id: { $in: [authToken._id] } } }
      );
      const rawAuthToken = await axiosInstance.get<AxiosResDataGeneric<HiddenAuthTokenInterface>>(
        apiEndpoint.invitations.getAuthTokenByEntityRowId({
          rowId: row._id,
          entity: "units",
        }),
        { params: { status: { $in: pendingInvitationStatuses } } }
      );

      const payload = rawAuthToken.data.data;
      setAuthTokenState(payload);
      showNotification(NOTIFICATIONS.SUCCESS.genericFn({ title: t("QR-code renewed") }));
    } catch (error: any) {
      await sleep(500);
      showNotification({ ...ERROR_NOTIFICATION, message: error.message || error });
    } finally {
      await sleep(700);
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} onClick={callRenewApi} variant="outline">
      {t("Renew QR-code")}
    </Button>
  );
}
