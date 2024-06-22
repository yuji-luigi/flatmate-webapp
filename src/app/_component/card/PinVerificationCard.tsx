import { Card, LoadingOverlay, Stack, Group, Title, PinInput, Container } from "@mantine/core";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PATH_IMAGE } from "../../../lib/image-paths";
import { useParams } from "next/navigation";
import axiosInstance from "../../../utils/axios-instance";
import { useCrudSliceStore } from "../../../redux/features/crud/crudSlice";
import { apiEndpointRootsEnum } from "../../../path/path-api";
import { MaintainerCompleteRegisterCard } from "../../../sections/nonce-check/m-file-upload/maintainer-complete-register/MaintainerCompleteRegisterCard";
import classes from "./PinVerificationCard.module.css";
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
  const endpoint =
    query?.linkId && query?.id
      ? `${apiEndpointRootsEnum.maintenanceFileUpload}/${query.linkId}/${query.id}`
      : "";
  const [submitting, setSubmitting] = useState<boolean>(false);
  // const { linkId, id } = query;
  const handleChange = (value: string) => {
    if (value.length === 6) {
      setSubmitting(true);
      // handleSubmit(value);
    }
  };

  // const handleSubmit = useCallback(
  //   async (value: string) => {
  //     try {
  //       if (typeof linkId !== "string" || typeof id !== "string") return;

  //       // first check maintainer has completed the register.
  //       const rawMaintainerCheck = await axiosInstance.post(
  //         apiEndpoint.authTokens.checkMaintainerFromMaintenance({ linkId, authTokenId: id }),
  //         { pin: value }
  //       );
  //       if (rawMaintainerCheck.data.success === false && rawMaintainerCheck.data.data) {
  //         setIsCompleteRegister(true);
  //         setCrudDocument({ entity: "maintainers", document: rawMaintainerCheck.data.data });
  //         setCrudDocument({
  //           entity: "maintenances",
  //           document: rawMaintainerCheck.data.maintenance,
  //         });
  //         return;
  //       }
  //       const rawRes = await axiosInstance.post<
  //         AxiosResDataGeneric<{ maintenance: MaintenanceModel }>
  //       >(endpoint, { pin: value });
  //       setCrudDocument({ entity: "maintenances", document: rawRes.data.data.maintenance });
  //       await sleep(1000);
  //       setPinOk(true);
  //     } catch (error: any) {
  //       showNotification({
  //         icon: <Icons.alert />,
  //         title: "Error",
  //         message: error.message || error,
  //         color: "red",
  //       });
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   },
  //   [endpoint, id, linkId, setCrudDocument, setPinOk]
  // );
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
