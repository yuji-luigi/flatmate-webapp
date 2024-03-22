import {
  Icon2fa as Authentication,
  IconBellRinging as Notification,
  IconDashboard as Dashboard,
  IconDatabaseImport as Database,
  IconFingerprint as Security,
  IconChartBar as Statistic,
  IconKey as Key,
  IconReceipt2 as Receipt,
  IconSettings as Cog,
  IconSwitchHorizontal as SwitchHorizontal,
  IconLogout as Logout,
  IconUser as User,
  IconBookmarks as Bookmark,
  IconMessage as Comment,
  IconBuilding as Building,
  IconRuler as FundRule,
  IconReceipt as Proposal,
  IconBusinessplan as Fund,
  IconBlockquote as Thread,
  IconAlien as Instance,
  IconTag as Tag,
  IconAlertCircle as Alert,
  IconX as Close,
  IconPlus as Plus,
  IconArticle as Article,
  IconMessageDots as MessageDots,
  IconPhoto as Photo,
  IconPaperclip as Paperclip,
  IconTrash as Trash,
  IconArchive as Archive,
  IconPhoto as Image,
  IconEdit as Edit,
  IconHammer as maintenance,
  IconCheck as check,
  IconMapPin as mapPin,
  IconMail as mail,
  IconPencil as pencil,
  IconPhoneCall as phoneCall,
  IconSettings as setting,
  IconTestPipe as plumber,
  // plumber icon
  IconHammer as hammer,
  IconBath as bath,
  IconTools as tools,
  IconDropletFilled as drop,
  IconDots as dots,
  // IconWall as wall,
  IconBolt as electric,
  IconFileInvoice as invoice,
  IconReload as reload,
  IconHourglassLow as hourglass,
  IconProgressCheck as progressCheck,
  IconClockStop as clockStop,
  IconReportAnalytics as reportAnalytics,
  IconBell as bell,
  IconColumns as columns,
  IconTable as table,
  IconCalendar as calendar,
  IconLogin as login,
  IconLogin2 as login2,
  IconWriting as writing,
  IconHome2 as home,
  IconStar as star,
} from "@tabler/icons-react";
/**
 * use the key name same as the slice name
 */

export const Icons = {
  authentication: Authentication,
  notifications: Notification,
  home,
  database: Database,
  security: Security,
  statistics: Statistic,
  key: Key,
  receipt: Receipt,
  cog: Cog,
  logout: Logout,
  switch: SwitchHorizontal,
  user: User,
  bookmarks: Bookmark,
  comments: Comment,
  funds: Fund,
  fundRules: FundRule,
  instances: Instance,
  proposals: Proposal,
  tags: Tag,
  threads: Thread,
  userSettings: Cog,
  alert: Alert,
  buildings: Building,
  close: Close,
  plus: Plus,
  article: Article,
  messageDots: MessageDots,
  photo: Photo,
  paperclip: Paperclip,
  trash: Trash,
  archive: Archive,
  image: Image,
  edit: Edit,
  maintenance,
  maintenances: maintenance,
  posts: Article,
  check,
  mapPin,
  mail,
  pencil,
  phoneCall,
  setting,
  Plumber: drop,
  Carpenter: hammer,
  Electrician: electric,
  dots,
  invoice,
  reload,
  hourglass,
  progressCheck,
  clockStop,
  reportAnalytics,
  bell,
  columns,
  table,
  calendar,
  login,
  login2,
  signup: writing,
  star,
} as const;
export const ICON_SIZES = {
  textTile: 16,
};
