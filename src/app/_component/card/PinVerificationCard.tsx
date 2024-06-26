import { Card, LoadingOverlay, Stack, Group, Title, PinInput, Container } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { PATH_IMAGE } from "../../../lib/image-paths";
import { useParams } from "next/navigation";
import axiosInstance from "../../../utils/axios-instance";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { apiEndpoint, apiEndpointRootsEnum } from "../../../path/path-api";
import { MaintainerCompleteRegisterCard } from "../../../sections/nonce-check/m-file-upload/maintainer-complete-register/MaintainerCompleteRegisterCard";
import classes from "./PinVerificationCard.module.css";
import { showNotification } from "@mantine/notifications";
import { Icons } from "../../../data/icons/icons";
import { useLocale } from "../../../../hooks/useLocale";
/**
 * @description Send pin code after verified get maintenance and set maintenance in redux store
 */
export const PinVerificationCard = (props: {
  setPinOk: (bool: boolean) => void;
  pinOk: boolean;
  verifyPinCallback?: () => void;
}) => {
  const { setPinOk } = props;
  const { t } = useLocale();
  const query = useParams();
  const { setCrudDocument } = useCrudSliceStore();
  const endpoint = apiEndpoint.authTokens.verifyPin({ linkId: query?.linkId as string });
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleChange = (value: string) => {
    if (value.length === 6) {
      setSubmitting(true);
      handleSubmit(value);
    }
  };
  // TODO: PASS CALL BACK AND CHANGE STATE OF PINOK CONSIDER API RESPONSE.
  const handleSubmit = useCallback(
    async (value: string) => {
      try {
        await axiosInstance.post(endpoint, { nonce: value });
        setPinOk(true);
      } catch (error: any) {
        showNotification({
          icon: <Icons.alert />,
          title: "Error",
          message: error.message || error,
          color: "red",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [endpoint, query?.linkId, setCrudDocument, setPinOk]
  );

  return (
    <Card className={classes.card}>
      <LoadingOverlay visible={submitting} />
      <Stack>
        <Group justify="center">
          <Image
            priority={false}
            src={PATH_IMAGE.unlock}
            width={120}
            height={120}
            alt="unlock image"
          />
        </Group>
        <Stack justify="center" mt={24}>
          <Title className={classes.heading}>{t("Enter the pin code")}</Title>
          <Group justify="center">
            <PinInput
              disabled={submitting}
              size="sm"
              length={6}
              type="number"
              onChange={handleChange}
            />
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};
