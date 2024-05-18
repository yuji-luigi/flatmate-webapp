import { TabList } from "../../../components/tab/TabList";
import { Icons } from "../../../data/icons/icons";
import DashboardSection from "./default-tabs/DashboardSection";
import { SpaceMaintenanceSection } from "./SpaceMaintenanceSection";
import { SpacePostSection } from "./SpacePostSection";
import { UserRoles } from "../../../lib/enums";
import { property_managerTabList } from "./property-manager/property-manager-tabs";

const inhabitant: TabList[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
  },
  {
    label: "Posts",
    value: "posts",
    icon: <Icons.article size="1.5rem" />,
    component: SpacePostSection,
  },
  {
    label: "Maintenance",
    value: "maintenances",
    icon: <Icons.maintenance size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: "Invoice",
    value: "invoices",
    icon: <Icons.invoice size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
];

const system_admin: TabList[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
  },
  {
    label: "Posts",
    value: "posts",
    icon: <Icons.article size="1.5rem" />,
    component: SpacePostSection,
  },
  {
    label: "Maintenance",
    value: "maintenances",
    icon: <Icons.maintenance size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: "Invoice",
    value: "invoices",
    icon: <Icons.invoice size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
];
const super_admin: TabList[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
  },
  {
    label: "Posts",
    value: "posts",
    icon: <Icons.article size="1.5rem" />,
    component: SpacePostSection,
  },
  {
    label: "Maintenance",
    value: "maintenances",
    icon: <Icons.maintenance size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: "Invoice",
    value: "invoices",
    icon: <Icons.invoice size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
];

const maintainer: TabList[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: () => <div>show stats of assigned maintenances + priorities</div>,
  },
  {
    label: "Maintenance",
    value: "maintenances",
    icon: <Icons.maintenance size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: "Invoice",
    value: "invoices",
    icon: <Icons.invoice size="1.5rem" />,
    component: () => <div>All the payments + un paid buildings as list</div>,
  },
];

export const dashboardTabsByUserType: Record<UserRoles, TabList[]> = {
  property_manager: property_managerTabList,
  maintainer,
  inhabitant,
  system_admin,
  super_admin: system_admin,
};
