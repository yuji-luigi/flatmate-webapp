import { TabList } from "../../../components/tab/TabList";
import { Icons } from "../../../data/icons/icons";
import { PropertyManagerMaintenanceTabPanel } from "../../../sections/property-manager/dashboard/tabs/maintenances/PropertyManagerMaintenanceTabPanel";
import { PropertyManagerDashboard } from "../../../sections/property-manager/dashboard/tabs/sum-dashboard/PropertyManagerDashboard";

export const property_managerTabList: TabList[] = [
  {
    htmlTitle: "Dashboard Amministratore",
    label: "Dashboard",
    value: "dashboard",
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: PropertyManagerDashboard,
  },
  {
    label: "Maintenance",
    value: "maintenances",
    icon: <Icons.maintenance size="1.5rem" />,
    component: PropertyManagerMaintenanceTabPanel,
  },
];
