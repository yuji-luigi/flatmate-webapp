import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import "dayjs/locale/it";
import "../../next-i18next.config";
// import "../../i18n";
import "../styles/global.css";
import "../styles/form.css";
import "../styles/dashboard.css";
import "../styles/tabs.css";
import "../styles/test.css";
import "../styles/nprogress.css";
import "../styles/components.css";
import "../styles/layout.css";
import "../styles/base.css";
import "../styles/utility.css";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "Flatmates",
  description: "Flatmates: the best way to manage your shared home",
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default RootLayout;
