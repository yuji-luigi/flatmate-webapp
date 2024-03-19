import { Card, Title, Box, MantineStyleProp } from "@mantine/core";
import React from "react";
import { TEXT_SIZE } from "../../text/text-size";
import classes from "./sideCardStyles.module.css";

interface Prop {
  title?: string | React.ReactNode;
  children?: React.ReactNode;
  titleSx?: MantineStyleProp;
  style?: MantineStyleProp;
}
const CardWithTitle = ({ title, children, titleSx, style }: Prop) => {
  return (
    <Card className={classes.card} style={style}>
      {title && (
        <Title style={{ fontSize: TEXT_SIZE.titleCard, ...titleSx }} mb={8}>
          {title}
        </Title>
      )}
      <Box className={classes.textsContainer} style={{}}>
        {children}
      </Box>
    </Card>
  );
};

export default CardWithTitle;
