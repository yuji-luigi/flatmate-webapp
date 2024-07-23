import { InviteButton } from "./customButtons/invite-by-entity/CrudInviteButton";
import { SectionAction, SectionActionData } from "../../../../types/data/json/sections-json";
import useRouterWithCustomQuery from "../../../../hooks/useRouterWithCustomQuery";
import { sectionConfigsByUserType } from "../../../../json/section-config/sectionsConfig";
import useAuth from "../../../../../hooks/useAuth";
import { CreateButton } from "./CreateButton";
import { ImportButton } from "./ImportButton";
import { ImportInhabitantUnitButton } from "./ImportInhabitantUnitButton";
import { PrintUnitQrCodeButton } from "./PrintUnitQrCodeButton";

export const CrudSectionActionContainer = () => {
  const { query } = useRouterWithCustomQuery();
  const { user } = useAuth();
  const entity = query.entity;
  if (!user || !entity || entity === "placeholder") return null;
  const sectionConfig = sectionConfigsByUserType[user?.loggedAs][entity];
  return sectionConfig.sectionActions?.map((action: SectionActionData) => (
    <CrudSectionActionController key={action.type} action={action} />
  ));
};

const buttons: Record<SectionAction, (props: SectionActionData) => JSX.Element | null> = {
  custom: (props: any) => <>Should not be custom inside of json. not to create dependency cycle</>,
  create: CreateButton,
  invite: InviteButton,
  "import-inhabitant-unit": ImportInhabitantUnitButton,
  import: ImportButton,
  "print-qr-unit": PrintUnitQrCodeButton,
};

function CrudSectionActionController({ action }: { action: SectionActionData }) {
  const Button = buttons[action.type];
  if (!Button) {
    throw new Error(`Button type ${action.type} is not supported`);
  }
  return <Button {...action} />;
}
