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
/**
 * @description Send pin code after verified get maintenance and set maintenance in redux store
 */
export const PinVerificationCard = (props: {
  setPinOk: (bool: boolean) => void;
  pinOk: boolean;
}) => {
  const { setPinOk } = props;
  const query = useParams();
  const [isCompleteRegister, setIsCompleteRegister] = useState<boolean>(false);
  const { setCrudDocument } = useCrudSliceStore();
  const endpoint = apiEndpoint.authTokens.verifyPin({ linkId: query?.linkId as string });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const handleChange = (value: string) => {
    if (value.length === 6) {
      setSubmitting(true);

      handleSubmit(value);
    }
  };

  const handleSubmit = useCallback(
    async (value: string) => {
      try {
        await axiosInstance.post(endpoint, { nonce: value });
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
  useEffect(() => {
    if (!endpoint) return;
    axiosInstance.get(endpoint).then((res) => {
      console.log(res.data.data);
    });
  }, [endpoint]);
  return (
    <Container className={classes.container}>
      {!isCompleteRegister && (
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
              <Title className={classes.heading}>Enter the pin code</Title>
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
      )}

      <MaintainerCompleteRegisterCard isCompleteRegister={isCompleteRegister} {...props} />
    </Container>
  );
};
