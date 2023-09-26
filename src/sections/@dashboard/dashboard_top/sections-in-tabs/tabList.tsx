import { Icons } from '../../../../data/icons/icons';
import DashboardSection from './stats-home/DashboardTopSection';
import { SpaceMaintenanceSection } from './SpaceMaintenanceSection';
import { SpacePostSection } from './SpacePostSection';

export const TAB_LIST_CONFIG = [
  {
    label: 'Dashboard',
    value: 'dashboard',
    icon: <Icons.reportAnalytics size="1.5rem" />,
    component: DashboardSection,
  },
  {
    label: 'Posts',
    value: 'posts',
    icon: <Icons.article size="1.5rem" />,
    component: SpacePostSection,
  },
  {
    label: 'Maintenance',
    value: 'maintenance',
    icon: <Icons.maintenance size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
  {
    label: 'Invoice',
    value: 'invoice',
    icon: <Icons.invoice size="1.5rem" />,
    component: SpaceMaintenanceSection,
  },
];
