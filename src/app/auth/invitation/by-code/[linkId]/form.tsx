import { Box, PinInput, Button, Text } from "@mantine/core";
import React from "react";
import classes from "./invitation-by-code.module.css";
import { handleSubmit } from "./action";

export const PinForm = () => {
  return (
    <Box component="form" action={handleSubmit} mt={24} className={classes["form-group"]}>
      <Text ta="center" fz={24}>
        Enter code here
      </Text>
      <PinInput
        name="nonce"
        style={{ justifyContent: "center", display: "flex", flexDirection: "row" }}
        size={"md"}
        length={6}
        type="number"
      />
      <Button type="submit">Submit</Button>
    </Box>
  );
};
