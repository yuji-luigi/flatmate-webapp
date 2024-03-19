import { Stack, Group, Text, Avatar } from "@mantine/core";
import React from "react";
import { ThreadModel } from "../../../types/models/thread-model";
import classes from "./SingleMaintenanceHeading.module.css";

const SingleMaintenanceHeading = ({ thread }: { thread: ThreadModel }) => {
  return (
    <Stack className={classes.header}>
      <Text className={classes.title} fw={800} component="a">
        {thread.title}
      </Text>
      <Group align="center">
        <Avatar src={thread.createdBy.avatar?.url} size={50} radius="xl" mr={0} />
        <Text fz="sm" inline>
          {thread.createdBy.name}
        </Text>
        <Text fz="sm" inline>
          {thread._createdAt}
        </Text>
      </Group>
    </Stack>
  );
};

export default SingleMaintenanceHeading;
