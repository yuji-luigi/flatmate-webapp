"use client";

import { useEffect } from "react";
import { useLocale } from "../../../../../../hooks/useLocale";
import { Box, Button, PinInput, Stack, Text } from "@mantine/core";
import Image from "next/image";
import { PATH_IMAGE } from "../../../../../lib/image-paths";

export default function InvitationByCodeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLocale("notification");
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Stack align="center" bd="red" gap={24}>
      <Image src={PATH_IMAGE.error} alt="Error" width={300} height={300} />
      <Text ta="center" fz={24}>
        {t(error.message) || "Something went wrong!"}{" "}
      </Text>
      <Button
        style={{ ml: "auto" }}
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </Button>
    </Stack>
  );
}
