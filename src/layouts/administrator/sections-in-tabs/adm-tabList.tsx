import { TabList } from "../../../components/tab/TabList";
import { Icons } from "../../../data/icons/icons";
import DashboardSection from "./adm-tabs/AdmDashboardSection";
import { SpaceMaintenanceSection } from "./SpaceMaintenanceSection";
import { SpacePostSection } from "./SpacePostSection";

export const TAB_LIST_CONFIG: TabList[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
  },
];
