import React, { ReactElement } from "react";
import { Container } from "@mantine/core";
import Layout from "../../../../layouts";

import RootSpaceList from "../../../../sections/dashboard/space_setting_section/RootSpaceList";
import classes from "../../../styles/global-useStyles.module.css";

const SpaceSettingsPage = () => {
  return (
    <>
      <h1 className={classes.title}>Choose condominium</h1>
      <RootSpaceList />
    </>
  );
};

// get layout
SpaceSettingsPage.getLayout = (page: ReactElement) => <Layout variant="dashboard">{page}</Layout>;

export default SpaceSettingsPage;
