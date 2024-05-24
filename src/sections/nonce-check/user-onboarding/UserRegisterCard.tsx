import { Card, Title, Button, Group, Grid } from "@mantine/core";
import React, { FormEvent, useMemo } from "react";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { CheckType } from "../../../types/models/maintenance-check-type";
import { useCrudSelectors } from "../../../redux/features/crud/crudSlice";
import FormFields from "../../../components/input/FormFields";
import { UseFormReturnTypeCustom } from "../../../components/input/input_interfaces/useForm_interface";
import allFormFields from "../../../json/dataTable/formfields";
import { getDefaultValues } from "../../../utils/getDefaultValues";
import axiosInstance from "../../../utils/axios-instance";
import { _PATH_API } from "../../../path/path-api";
import { constructErrorNotificationData } from "../../../data/showNofification/notificationObjects";
import { PATH_AFTER_LOGIN } from "../../../path/path-frontend";
import { sleep } from "../../../utils/helpers/helper-functions";
import useAuth from "../../../../hooks/useAuth";
import classes from "./UserRegisterCard.module.css";
import { UserModel } from "../../../types/models/space-model";

export const UserRegisterCard = ({
  setCheckType,
}: {
  setCheckType: (type: CheckType | null) => void;
}) => {
  const { login } = useAuth();
  const { push } = useRouter();
  const { crudDocument: user } = useCrudSelectors<UserModel>("users");
  const formFields = allFormFields.users;
  const initialValues = useMemo(() => getDefaultValues(formFields, user), [user]);
  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  //! Todo send authToken to backend to verify user again
  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!user) {
        showNotification({
          ...constructErrorNotificationData,
          message: "Something went wrong, please try again later",
        });
        return;
      }
      if (!form.values.password) {
        showNotification({
          ...constructErrorNotificationData,
          message: "Please enter a password",
        });
        return;
      }
      const rawRes = await axiosInstance.put(_PATH_API.users.onBoarding(user._id), form.values);
      showNotification({
        title: "Success",
        message: "You have successfully registered",
        color: "blue",
      });
      const { data } = rawRes.data;
      await sleep(1000);
      push(PATH_AFTER_LOGIN(data.loggedAs));
    } catch (error: any) {
      showNotification({
        ...constructErrorNotificationData,
        message: error.message || error,
      });
    }
  };
  return (
    <Card px={32} py={40}>
      <Title mb={32}>Register To Flatmates</Title>
      <form onSubmit={onSubmit}>
        <Grid className={classes.formContainer}>
          {formFields.map(
            (formField) =>
              formField.name !== "role" &&
              formField.name !== "rootSpaces" && (
                <Grid.Col
                  span={{
                    xs: 12,
                    sm: 6,
                    lg: 4,
                  }}
                  key={formField.id}
                >
                  <FormFields form={form} formField={formField} />
                </Grid.Col>
              )
          )}
        </Grid>
        <Group className={classes.buttonContainer} justify="right">
          <Button className={classes.button} variant="gradient" type="submit">
            Register
          </Button>
          <Button className={classes.button} variant="outline">
            Cancel
          </Button>
        </Group>
      </form>
    </Card>
  );
};
