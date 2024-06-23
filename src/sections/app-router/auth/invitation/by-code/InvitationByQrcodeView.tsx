import React from "react";
import { useRouter, redirect } from "next/navigation";
import classes from "./invitation-by-code.module.css";
import { Container, Title, Box, PinInput, Button, Text } from "@mantine/core";
import InvitationByCodeError from "./nonce-form-error";
import { cookies, headers } from "next/headers";
import { apiEndpoint } from "../../../../../path/path-api";
import axiosInstance from "../../../../../utils/axios-instance";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { _PATH_FRONTEND } from "../../../../../path/path-frontend";

export const InvitationByQrcodeView = ({
  params,
  handleSubmit,
}: {
  handleSubmit: (formData: FormData) => Promise<void>;
  params: { linkId: string };
}) => {
  return (
    <Container className={classes.container}>
      <Title>You are invited</Title>
      <Text>
        You have been invited to join the team! Please enter the code from the letter to proceed.
      </Text>
      <ErrorBoundary errorComponent={InvitationByCodeError}>
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
      </ErrorBoundary>
    </Container>
  );
};
