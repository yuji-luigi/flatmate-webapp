import { InviteButton } from "./customButtons/InviteButton";
import { SectionActionData } from "../../../../types/data/json/sections-json";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { sectionConfigsByUserType } from "../../../../json/section-config/sectionsConfig";
import useAuth from "../../../../../hooks/useAuth";
import { CreateButton } from "./CreateButton";
import { ImportButton } from "./ImportButton";

export const CrudSectionActionContainer = () => {
  const { query } = useRouterWithCustomQuery();
  const { user } = useAuth();
  const entity = query.entity;
  if (!user || !entity) return null;
  const sectionConfig = sectionConfigsByUserType[user?.loggedAs][entity];
  return sectionConfig.sectionActions?.map((action: any) => (
    <CrudSectionActionController key={action.key} action={action} />
  ));
};

const buttons: Record<string, (props: any) => JSX.Element> = {
  custom: (props: any) => <>Should not be custom inside of json. not to create dependency cycle</>,
  create: CreateButton,
  invite: InviteButton,
  import: ImportButton,
};

function CrudSectionActionController({ action }: { action: SectionActionData }) {
  const Button = buttons[action.type];
  return <Button {...action} />;
}
