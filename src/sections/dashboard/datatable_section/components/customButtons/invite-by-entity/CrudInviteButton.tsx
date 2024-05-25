import { useLocale } from "../../../../../../../hooks/useLocale";
import useRouterWithCustomQuery from "../../../../../../hooks/useRouterWithCustomQuery";
import { BaseInviteButton } from "./BaseInviteButton";
import { useCookieContext } from "../../../../../../context/CookieContext";
import { SectionActionData } from "../../../../../../types/data/json/sections-json";

export const InviteButton = (props: SectionActionData) => {
  const { currentSpace } = useCookieContext();
  const {
    query: { entity },
  } = useRouterWithCustomQuery();
  const { t } = useLocale();
  if (!entity || !currentSpace) {
    console.error("entity or currentSpace is not defined. for CrudInviteButton");
    return null;
  }
  return <BaseInviteButton currentSpace={currentSpace} label={entity} entity={entity} {...props} />;
};
