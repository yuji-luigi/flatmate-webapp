import { TabList } from "../../../components/tab/TabList";
import { Icons } from "../../../data/icons/icons";
import DashboardSection from "./tabs/DashboardSection";
import { SpaceMaintenanceSection } from "./SpaceMaintenanceSection";
import { SpacePostSection } from "./SpacePostSection";
import { UserRoles } from "../../../lib/enums";

const property_manager: TabList[] = [
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
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
    component: () => <div>All the payments as list</div>,
  },
];

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

export const TAB_LIST_CONFIG: Record<UserRoles, TabList[]> = {
  property_manager,
  maintainer,
  inhabitant,
  system_admin,
  super_admin: system_admin,
};
