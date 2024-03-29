import { Avatar, Card, Stack, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { PATH_CLIENT } from "../../../../path/path-frontend";

export const NoMaintainerCard = ({ type }: { type: string }) => {
  return (
    <Card
      component={Link}
      href={`${PATH_CLIENT.maintainers}?type=${type}`}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {" "}
      <Avatar size={160} radius="md" />
      <Stack>
        <Text fw={600} fz={24}>
          NO MAINTAINER IS SELECTED
        </Text>
        <Text fz={16}>Click here and search {type}</Text>
      </Stack>
    </Card>
  );
};
