import { Button } from "@mantine/core";
import { useCustomModalContext } from "../../../../../context/modal-context/_ModalContext";
import { InviteModal } from "./InviteModal";
import { useLocale } from "../../../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../../../hooks/useRouterWithCustomQuery";
import { Icons } from "../../../../../data/icons/icons";

export const InviteButton = (props: { label: string; className?: string }) => {
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
      children: <InviteModal entity={entity} />,
    });
  };

  return (
    <Button
      className={className}
      onClick={handleOpenModal}
      leftSection={<Icons.Send />}
      color="lime"
      variant="outline"
      {...props}
    >
      {label}
    </Button>
  );
};
