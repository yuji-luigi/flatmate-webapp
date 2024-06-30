"use client";
import { Container, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { useLocale } from "../../../../../hooks/useLocale";
import { PATH_IMAGE } from "../../../../lib/image-paths";

const VerificationPendingPage = () => {
  const { t } = useLocale();
  return (
    <Container py={72} style={{ minHeight: "100dvh" }}>
      <Stack justify="center" align="center" style={{ height: "100%" }}>
        <Title ta="center">{t("Please check your email")}</Title>
        <Stack justify="center" gap={0}>
          <img src={PATH_IMAGE.sendingEmail} alt="" height={300} width={400} />
          <a
            style={{ fontSize: 12, marginLeft: "auto" }}
            href="https://www.freepik.com/free-vector/paper-airplane-send-with-dotted-lines-flat-style_59539123.htm#fromView=search&page=1&position=16&uuid=2f825e95-51ff-408a-a551-70722d293468"
          >
            Image by juicy_fish on Freepik
          </a>
        </Stack>

        <Text ta="center">
          {t("We have sent you email. please check your email and verify your registration")}
        </Text>
      </Stack>
    </Container>
  );
};

export default VerificationPendingPage;
