import { TabList } from "../../../../components/tab/TabList";
import { Icons } from "../../../../data/icons/icons";
import { PropertyManagerDashboard } from "./PropertyManagerDashboard";

export const property_managerTabList: TabList[] = [
  {
    htmlTitle: "Dashboard Amministratore",
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: PropertyManagerDashboard,
  },
];
