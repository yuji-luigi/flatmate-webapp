import React, { ReactElement } from "react";
import Layout from "../../../layouts";

const ThreadsPage = () => {
  return <div>ThreadsPage</div>;
};
ThreadsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default ThreadsPage;
