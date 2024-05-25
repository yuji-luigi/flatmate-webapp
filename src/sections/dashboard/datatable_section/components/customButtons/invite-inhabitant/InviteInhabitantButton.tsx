import { Button } from "@mantine/core";
import { useCustomModalContext } from "../../../../../../context/modal-context/_ModalContext";
import { InviteModal } from "../invite-by-entity/CrudInviteModal";
import { useLocale } from "../../../../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../../../../hooks/useRouterWithCustomQuery";
import { Icons } from "../../../../../../data/icons/icons";
import { InviteInhabitantModal } from "./InviteInhabitantModal";

export const InviteInhabitantButton = (props: { label: string; className?: string }) => {
  const { label, className } = props;
  const { openModal } = useCustomModalContext();
  const {
    query: { entity },
  } = useRouterWithCustomQuery();
  const { t } = useLocale();
  const handleOpenModal = () => {
    if (!entity) return;
    openModal({
      // title: t(section.createButton),
      type: "headless",
      centered: true,
      children: <InviteInhabitantModal entity="inhabitant" />,
    });
  };

  return (
    <Button
      className={className}
      onClick={handleOpenModal}
      leftSection={<Icons.users />}
      color="lime"
      variant="outline"
      {...props}
    >
      {t("Invite inhabitant")}
    </Button>
  );
};
