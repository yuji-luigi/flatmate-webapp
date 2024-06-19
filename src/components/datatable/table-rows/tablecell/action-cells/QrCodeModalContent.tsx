import { Stack, Button, Text, LoadingOverlay } from "@mantine/core";
import { useState } from "react";
import { hideNotification, showNotification } from "@mantine/notifications";
import { HiddenAuthTokenInterface } from "../../../../../types/models/auth-token-model";
import { apiEndpoint } from "../../../../../path/path-api";
import axiosInstance from "../../../../../utils/axios-instance";
import { MongooseBaseModel } from "../../../../../types/models/mongoose-base-model";
import { NOTIFICATIONS } from "../../../../../data/showNofification/notificationObjects";
import { QrCodeView } from "../../../../qr-code/QrCodeView";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { getEntityFromUrl, sleep } from "../../../../../utils/helpers/helper-functions";
import { useLocale } from "../../../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../../../hooks/useRouterWithCustomQuery";

export const QrCodeModalContent = ({
  authToken,
  row,
}: {
  authToken: HiddenAuthTokenInterface;
  row: MongooseBaseModel;
}) => {
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

  if (authToken?.active) {
    qrCodeView = <QrCodeView authToken={authToken} />;
    sendText = "Send QR-code mail";
  }

  return (
    <>
      {qrCodeView}
      <Stack gap={16} px={80} mt={24}>
        <Button onClick={sendEmailToUser}>{sendText}</Button>
        <Button onClick={closeModal} variant="outline">
          {t("Close")}
        </Button>
        <LoadingOverlay visible={isLoading} />
      </Stack>
    </>
  );
};
