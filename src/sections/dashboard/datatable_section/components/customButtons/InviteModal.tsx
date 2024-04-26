import { Alert, Box, Button, Modal, Stack, TextInput } from "@mantine/core";
import { useRef, useState } from "react";
import { showNotification } from "@mantine/notifications";
import axiosInstance from "../../../../../utils/axios-instance";
import { _PATH_API } from "../../../../../path/path-api";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";
import { useCookieContext } from "../../../../../context/CookieContext";
import { ERROR_GENERAL } from "../../../../../data/showNofification/notificationObjects";
import { useLocale } from "../../../../../../hooks/useLocale";
import { Icons } from "../../../../../data/icons/icons";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { CurrentSpace } from "../../../../../types/context/auth/useAuth";
import { AlertCustom } from "../../../../../components/alert/AlertCustom";

type InviteModalProps = {
  entity: FrontendEntity;
};

export const InviteModal: React.FC<InviteModalProps> = (props: InviteModalProps) => {
  const { isOpenModal: opened, closeModal: close, modalData } = useCustomModalContext();
  const [error, setError] = useState<string | null>(null);
  const { entity } = props;
  const { currentSpace } = useCookieContext();
  const emailRef = useRef<HTMLInputElement>(null);
  const { t } = useLocale();
  const handleSendInvite = async () => {
    if (!currentSpace) {
      return;
    }
    if (!emailRef.current?.value) {
      showNotification({ ...ERROR_GENERAL, message: t("Email is required") });
      return;
    }
    const rawResult = await axiosInstance
      .post(_PATH_API.users.invite(entity), {
        email: emailRef.current?.value,
        space: currentSpace._id,
      })
      .catch((err) => {
        setError(t(err));
      });
  };

  if (!currentSpace) {
    return <div>Error... Your building is not set in browser...</div>;
  }

  return (
    <Modal {...modalData} opened={opened} onClose={close} size="lg" withCloseButton={false}>
      <div className=" invite-modal flex-box-column">
        <ModalTitle currentSpace={currentSpace} />
        {error && <AlertCustom type="error">{error}</AlertCustom>}
        <TextInput
          label="Email"
          placeholder="Enter email"
          ref={emailRef}
          onFocus={() => setError(null)}
        />
        {/* {currentSpace?.name} */}
        <Button onClick={handleSendInvite}>{t("Invite")}</Button>
      </div>
    </Modal>
  );
};

function ModalTitle({ currentSpace }: { currentSpace: CurrentSpace }) {
  const { t } = useLocale();

  return (
    <Stack gap={4} justify="center" align="center">
      <Icons.propertyManagerBuilding size={60} />
      <h2>
        {t("Invite Property Manager to")} {currentSpace.name}
      </h2>
    </Stack>
  );
}
