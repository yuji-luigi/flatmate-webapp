import { Alert, Box, Button, LoadingOverlay, Modal, Stack, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import { hideNotification, showNotification } from "@mantine/notifications";
import { set } from "nprogress";
import axiosInstance from "../../../../../../utils/axios-instance";
import { apiEndpoint } from "../../../../../../path/path-api";
import { FrontendEntity } from "../../../../../../types/redux/CrudSliceInterfaces";
import { useCookieContext } from "../../../../../../context/CookieContext";
import {
  ERROR_GENERAL,
  LOADING_GENERAL,
  SUCCESS_GENERAL,
} from "../../../../../../data/showNofification/notificationObjects";
import { useLocale } from "../../../../../../../hooks/useLocale";
import { Icons } from "../../../../../../data/icons/icons";
import { useCustomModalContext } from "../../../../../../context/modal-context/_ModalContext";
import { CurrentSpace } from "../../../../../../types/context/auth/useAuth";
import { AlertCustom } from "../../../../../../components/alert/AlertCustom";
import { sleep } from "../../../../../../utils/helpers/helper-functions";
import { useCrudSliceStore } from "../../../../../../redux/features/crud/crudSlice";

type InviteModalProps = {
  entity: FrontendEntity;
};

export const InviteInhabitantModal: React.FC<InviteModalProps> = (props: InviteModalProps) => {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { entity } = props;
  const { addOneInStore } = useCrudSliceStore();
  const { currentSpace } = useCookieContext();
  const emailRef = useRef<HTMLInputElement>(null);
  const { t } = useLocale();

  const handleSendInvite = async () => {
    const isEmailValid = emailRef.current?.value?.match(/^\S+@\S+$/);
    email: if (!currentSpace) {
      return;
    }
    if (!isEmailValid) {
      showNotification({ ...ERROR_GENERAL, message: t("Invalid email") });
      setError(t("Invalid email"));
      return;
    }
    if (!emailRef.current?.value) {
      showNotification({ ...ERROR_GENERAL, message: t("Email is required") });
      return;
    }
    setLoading(true);

    const loadingNotif = showNotification({
      ...LOADING_GENERAL,
      message: t("Sending invitation..."),
    });
    try {
      const rawResult = await axiosInstance.post(`${apiEndpoint.invitations.root}/${entity}`, {
        email: emailRef.current?.value,
        space: currentSpace._id,
      });
      const invitation = rawResult.data.data;
      addOneInStore({ entity, newDocument: invitation });

      await sleep(750);
      showNotification({
        ...SUCCESS_GENERAL,
        message: t("Invitation has been sent successfully!"),
      });

      close();
    } catch (err: string | any) {
      setError(t(err.message || err));
    } finally {
      setLoading(false);
      hideNotification(loadingNotif);
    }
  };

  if (!currentSpace) {
    return <div>Error... Your building is not set in browser...</div>;
  }

  return (
    <Modal {...modalData} opened={opened} onClose={close} size="lg" withCloseButton={false}>
      <div className="invite-modal flex-column" data-is-loading={loading}>
        <ModalTitle currentSpace={currentSpace} entity={entity} />
        {error && <AlertCustom type="error">{error}</AlertCustom>}
        <TextInput
          label={`Email ${t("of")} ${t(`$${entity}`)}`}
          placeholder="Enter email"
          ref={emailRef}
          onFocus={() => setError(null)}
        />
        {/* {currentSpace?.name} */}
        <Button onClick={handleSendInvite}>{t("Invite")}</Button>
        <LoadingOverlay visible={loading} />
      </div>
    </Modal>
  );
};

function ModalTitle({ currentSpace, entity }: { currentSpace: CurrentSpace; entity: string }) {
  const { t } = useLocale();

  return (
    <Stack gap={4} justify="center" align="center">
      <Icons.propertyManagerBuilding size={60} />
      <h2>
        {t("Invite")} {t(`$${entity}`)}
      </h2>
      <h3>{currentSpace.name}</h3>
    </Stack>
  );
}
