import { SectionConfig } from "../../types/data/json/sections-json";
import { FrontendEntity } from "../../types/redux/CrudSliceInterfaces";
import { checks, inhabitant, maintainer, maintenances, spaces } from "./sectionBaseConfigs";

const dataTableSections: FrontendEntity[] = [
  "spaces",
  "inhabitant",
  "maintainer",
  "checks",
  "maintenances",
];
const cardListSections: FrontendEntity[] = [
  "spaces",
  "inhabitant",
  "maintainer",
  "checks",
  "maintenances",
];
export const propertyManagerSectionConfigs: Record<FrontendEntity, SectionConfig> = {
  spaces,
  inhabitant,
  maintainer,
  checks,
  maintenances,
};
