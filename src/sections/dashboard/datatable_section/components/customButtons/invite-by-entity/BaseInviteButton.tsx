import { Button } from "@mantine/core";
import { useCustomModalContext } from "../../../../../../context/modal-context/_ModalContext";
import { InviteModal } from "./CrudInviteModal";
import { useLocale } from "../../../../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../../../../hooks/useRouterWithCustomQuery";
import { Icons } from "../../../../../../data/icons/icons";
import { FrontendEntity } from "../../../../../../types/redux/CrudSliceInterfaces";
import { BaseInviteModal } from "./BaseInviteModal";
import { CurrentSpace } from "../../../../../../types/context/auth/useAuth";

type BaseInviteButtonProps = {
  label: string;
  className?: string;
  entity: FrontendEntity;
  currentSpace: CurrentSpace;
};
export const BaseInviteButton = ({
  label,
  className,
  currentSpace,
  entity,
  ...other
}: BaseInviteButtonProps) => {
  const { openModal } = useCustomModalContext();

  const { t } = useLocale();
  const handleOpenModal = () => {
    if (!entity) return;
    openModal({
      // title: t(section.createButton),
      type: "headless",
      centered: true,
      children: <BaseInviteModal currentSpace={currentSpace} entity={entity} />,
    });
  };

  return (
    <Button
      className={className}
      onClick={handleOpenModal}
      leftSection={<Icons.Send />}
      color="lime"
      variant="outline"
      {...other}
    >
      {label}
    </Button>
  );
};
