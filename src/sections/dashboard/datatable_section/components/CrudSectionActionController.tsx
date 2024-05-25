import { InviteButton } from "./customButtons/invite-by-entity/CrudInviteButton";
import { SectionActionData } from "../../../../types/data/json/sections-json";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { sectionConfigsByUserType } from "../../../../json/section-config/sectionsConfig";
import useAuth from "../../../../../hooks/useAuth";
import { CreateButton } from "./CreateButton";
import { ImportButton } from "./ImportButton";
import { ImportInhabitantUnitButton } from "./ImportInhabitantUnitButton";

export const CrudSectionActionContainer = () => {
  const { query } = useRouterWithCustomQuery();
  const { user } = useAuth();
  const entity = query.entity;
  if (!user || !entity) return null;
  const sectionConfig = sectionConfigsByUserType[user?.loggedAs][entity];
  return sectionConfig.sectionActions?.map((action: SectionActionData) => (
    <CrudSectionActionController key={action.type} action={action} />
  ));
};

const buttons: Record<string, (props: SectionActionData) => JSX.Element | null> = {
  custom: (props: any) => <>Should not be custom inside of json. not to create dependency cycle</>,
  create: CreateButton,
  invite: InviteButton,
  "import-inhabitant-unit": ImportInhabitantUnitButton,
  import: ImportButton,
};

function CrudSectionActionController({ action }: { action: SectionActionData }) {
  const Button = buttons[action.type];
  return <Button {...action} />;
}
