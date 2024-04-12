import React, { ReactElement } from "react";
import Layout from "../../../layouts";

const SettingsPage = () => {
  return <div>SettingsPage</div>;
};

SettingsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SettingsPage;
