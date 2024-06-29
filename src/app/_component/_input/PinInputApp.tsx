import { PinInput } from "@mantine/core";
import React from "react";

export const PinInputApp = ({ length = 6, style }: { length?: number; style?: any }) => {
  return (
    <PinInput
      name="nonce"
      style={{ justifyContent: "center", display: "flex", flexDirection: "row", ...style }}
      size={"md"}
      length={6}
      type="number"
    />
  );
};
