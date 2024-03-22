import React, { ReactElement } from "react";
import { Container, Divider } from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import axiosInstance from "../../../../utils/axios-instance";
import Layout from "../../../../layouts";
import RelatedArticlesArea from "../../../../sections/dashboard/maintenance_detail_page/RelatedArticleArea";
import { SingleArticleCard } from "../../../../components/posts/SingleArticleCard";
import { SingleArticleHeading } from "../../../../components/posts/SingleArticleHeading";
import classes from "./MaintenancePage.module.css";
import { MaintenanceModel } from "../../../../types/models/maintenance-check-type";

const MaintenancePage = ({ maintenance }: { maintenance: MaintenanceModel }) => {
  // return 'rendered';
  return (
    <Container py="xl" className={classes.main}>
      <SingleArticleHeading data={maintenance} />
      {/* <PostEditButton data={maintenance} entity="maintenances" /> */}
      <SingleArticleCard data={maintenance} />
      <Divider className={classes.articleMenuDivider} />
      <RelatedArticlesArea />
    </Container>
  );
};

MaintenancePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const jwtToken = context.req.cookies.jwt;
  try {
    const rawThread = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/maintenances/${context.query.documentId}`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          space: context.req.cookies.space || "",
          organization: context.req.cookies.organization || "",
        },
      }
    );

    const maintenance = rawThread.data.data;
    // define case nothing is in the data. go back to posts page
    if (!maintenance) {
      return {
        redirect: {
          destination: "/dashboard/posts",
        },
      };
    }

    // by default show the single post
    return {
      props: {
        maintenance,
      },
    };
  } catch (error) {
    // log error and send to posts page
    console.error(error);
    return {
      redirect: {
        destination: "/dashboard/posts",
      },
    };
  }
};

export default MaintenancePage;
