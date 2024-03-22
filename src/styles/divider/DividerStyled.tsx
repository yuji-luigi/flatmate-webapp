import { Divider, Text } from "@mantine/core";
import React from "react";

export const DividerStyled = ({ label }: { label: string | React.ReactNode }) => (
  <Divider
    labelPosition="center"
    label={
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Text>
    }
  />
);
