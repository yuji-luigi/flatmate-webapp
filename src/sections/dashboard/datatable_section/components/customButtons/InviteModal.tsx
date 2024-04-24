import { Button, TextInput } from "@mantine/core";
import { useRef } from "react";
import { showNotification } from "@mantine/notifications";
import axiosInstance from "../../../../../utils/axios-instance";
import { _PATH_API } from "../../../../../path/path-api";
import { FrontendEntity } from "../../../../../types/redux/CrudSliceInterfaces";
import { useCookieContext } from "../../../../../context/CookieContext";
import { ERROR_GENERAL } from "../../../../../data/showNofification/notificationObjects";
import { useLocale } from "../../../../../../hooks/useLocale";

type InviteModalProps = {
  entity: FrontendEntity;
};

export const InviteModal: React.FC<InviteModalProps> = (props: InviteModalProps) => {
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
    const rawResult = await axiosInstance.post(_PATH_API.users.invite(entity), {
      email: emailRef.current?.value,
      space: currentSpace._id,
    });
  };

  return (
    <div className="flex-box-column">
      <TextInput label="Email" placeholder="Enter email" ref={emailRef} />
      {/* {currentSpace?.name} */}
      <Button onClick={handleSendInvite}>Invite</Button>
    </div>
  );
};
