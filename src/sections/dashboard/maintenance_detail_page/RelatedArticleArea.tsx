import { Card, Group, Box } from "@mantine/core";
import React from "react";
import classes from "./RelatedArticleArea.module.css";

const RelatedArticlesArea = () => {
  const relatedArticles = false;
  if (!relatedArticles) {
    return null;
  }
  return (
    <Card className={classes.articleArea}>
      <Group justify="space-between" align="flex-end" className={classes.footer}>
        <Box className={classes.relatedArticlesSection} />
      </Group>
    </Card>
  );
};

export default RelatedArticlesArea;
