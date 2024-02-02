import { Icons } from '../../../data/icons/icons';
import DashboardSection from './DashboardTopSection';
import { SpaceMaintenanceSection } from '../dashboardkkk/sections-in-tabs/SpaceMaintenanceSection';
import { SpacePostSection } from '../dashboardkkk/sections-in-tabs/SpacePostSection';
import { AdminDashboardSection } from './AdminDashboardSection';

export const ADMIN_DASHBOARD_TABLIST = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: AdminDashboardSection,
  },
  // {
  //   label: 'Posts',
  //   value: 'posts',
  //   icon: <Icons.article size="1.5rem" />,
  //   component: SpacePostSection,
  // },
  // {
  //   label: 'Maintenance',
  //   value: 'maintenances',
  //   icon: <Icons.maintenance size="1.5rem" />,
  //   component: SpaceMaintenanceSection,
  // },
  // {
  //   label: 'Invoice',
  //   value: 'invoices',
  //   icon: <Icons.invoice size="1.5rem" />,
  //   component: SpaceMaintenanceSection,
  // },
];
