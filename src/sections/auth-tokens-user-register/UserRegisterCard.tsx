import {
  Card,
  Title,
  Box,
  Button,
  Text,
  Group,
  createStyles,
  TextInput,
  Grid,
} from '@mantine/core';
import React, { FormEvent, useMemo } from 'react';
import { CheckType } from '../../types/models/check-type';
import { useCrudSelectors } from '../../redux/features/crud/crudSlice';
import { useForm } from '@mantine/form';
import FormFields from '../../components/input/FormFields';
import { UseFormReturnTypeCustom } from '../../components/input/input_interfaces/useForm_interface';
import allFormFields from '../../../json/dataTable/formfields';
import { getDefaultValues } from '../../utils/getDefaultValues';
import axiosInstance from '../../utils/axios-instance';
import { _PATH_API } from '../../path/api-routes';
import { showNotification } from '@mantine/notifications';
import { constructErrorNotificationData } from '../../data/showNofification/notificationObjects';
import { useRouter } from 'next/router';
import { PATH_AFTER_LOGIN } from '../../path/page-paths';
import { sleep } from '../../utils/helpers/helper-functions';
import useAuth from '../../../hooks/useAuth';

const useStyles = createStyles((theme) => ({
  formContainer: {
    justifyContent: 'start',
    marginBlock: theme.spacing.md,
  },
  buttonContainer: {
    // display: 'flex',
    width: '100%',
  },
  button: {
    flex: 1,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
      flex: 'unset',
    },
  },
}));
export const UserRegisterCard = ({
  setCheckType,
}: {
  setCheckType: (type: CheckType | null) => void;
}) => {
  const { classes } = useStyles();
  const { login } = useAuth();
  const { push } = useRouter();
  const { crudDocument: user } = useCrudSelectors('users');
  const formFields = allFormFields.users;
  const initialValues = useMemo(() => getDefaultValues(formFields, user), [user]);
  const form = useForm({
    initialValues,
  }) as UseFormReturnTypeCustom;

  //! Todo send authToken to backend to verify user again
  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (!form.values.password) {
        showNotification({
          ...constructErrorNotificationData,
          message: 'Please enter a password',
        });
        return;
      }
      const rawRes = await axiosInstance.put(_PATH_API.users.onBoarding(user._id), form.values);
      showNotification({
        title: 'Success',
        message: 'You have successfully registered',
        color: 'blue',
      });
      const { data } = rawRes.data;
      await sleep(1000);
      login(user.email, form.values.password as string);
      push(PATH_AFTER_LOGIN);
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
              formField.name !== 'role' &&
              formField.name !== 'rootSpaces' && (
                <Grid.Col xs={12} sm={6} lg={4} key={formField.id}>
                  <FormFields form={form} formField={formField} />
                </Grid.Col>
              )
          )}
        </Grid>
        <Group className={classes.buttonContainer} position="right">
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