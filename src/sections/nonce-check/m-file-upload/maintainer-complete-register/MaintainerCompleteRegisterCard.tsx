import { Box, Button, Card, Grid, Group, Text, Title, Transition } from '@mantine/core';
import React, { useEffect, useMemo } from 'react';
import { useForm } from '@mantine/form';
import FormFields from '../../../../components/input/FormFields';
import classes from './MaintainerCompleteRegisterCard.module.css';
import { maintainersTableData } from '../../../../../json/dataTable/formfields/maintainersTableData';
import { getDefaultValues } from '../../../../utils/getDefaultValues';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
import { StepperDemo } from '../../../../components/stepper/StepperDemo';
import { StepperGeneric } from '../../../../components/stepper/StepperGeneric';
import { PasswordFormType } from '../../../../types/general/data/data-table/form-field-type/formField-types';
import { _PATH_API } from '../../../../path/path-api';
import axiosInstance from '../../../../utils/axios-instance';
import { MaintenanceModel } from '../../../../types/models/maintenance-check-type';

maintainersTableData.push({
  id: 'password2',
  name: 'password2',
  label: 'Confirm Password',
  type: 'password',
  registerStep: 'complete',
  priority: 10,
  col: {
    xs: 12,
  },
});
const companyStepJson = maintainersTableData.filter(
  (formField) => formField.registerStep === 'company'
);
const contactStepJson = maintainersTableData.filter(
  (formField) => formField.registerStep === 'contact'
);
const completeStepJson = maintainersTableData
  .filter((formField) => formField.registerStep === 'complete')
  .sort((a, b) => (a.priority || 0) - (b.priority || 0));

export const MaintainerCompleteRegisterCard = (props: {
  isCompleteRegister: boolean;
  setPinOk: (ok: boolean) => void;
  pinOk: boolean;
}) => {
  const { isCompleteRegister, setPinOk, pinOk } = props;
  const { crudDocument: maintainer } = useCrudSelectors<MaintainerModel>('maintainers');
  const { crudDocument: maintenance } = useCrudSelectors<MaintenanceModel>('maintenances');
  const defaultValues = getDefaultValues(maintainersTableData, maintainer);
  // const defaultValues = useMemo(
  //   () => getDefaultValues(maintainersTableData, maintainer),
  //   [maintainer?._id]
  // );
  const form = useForm({
    initialValues: { ...defaultValues },
  });
  const { values } = form;
  useEffect(() => {
    form.setValues(defaultValues);
  }, [isCompleteRegister]);
  let _maintainersTableData = maintainersTableData.map((formField) => {
    const _formField = structuredClone(formField);
    return _formField;
  });
  _maintainersTableData = _maintainersTableData.filter(
    (formField) => formField.name !== 'password'
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const rootSpace = maintenance.space;
      const { organization } = maintenance;
      const rawRes = await axiosInstance.post(_PATH_API.auth.registerMaintainer, {
        ...form.values,
        _id: maintainer._id,
        organization,
        rootSpace,
        maintenanceId: maintenance._id,
      });
      console.log(rawRes);
      setPinOk(true);
    } catch (error: any) {
      console.error(error?.message || error);
    }
  };
  if (pinOk) return null;
  return (
    <Transition
      mounted={isCompleteRegister}
      duration={500}
      transition="slide-up"
      timingFunction="ease-in-out"
    >
      {(styles) => (
        <div data-show={isCompleteRegister} className={classes.transitionDiv} style={styles}>
          <Title mb={36}>Register To Flatmates</Title>
          <form onSubmit={onSubmit} className={classes.form}>
            <StepperGeneric
              classNames={{
                buttonContainer: classes.stepButtons,
              }}
              steps={[
                {
                  key: '1',
                  props: { label: 'Company info' },
                  content: (
                    <Grid className={classes.formContainer}>
                      {companyStepJson.map(
                        (formField) =>
                          formField.name !== 'role' &&
                          formField.name !== 'rootSpaces' && (
                            <Grid.Col
                              // style={{ height: '100%' }}
                              span={{
                                xs: formField.col?.xs || 12,
                                sm: formField.col?.sm || 6,
                                lg: formField.col?.lg || 6,
                              }}
                              key={formField.id}
                            >
                              <FormFields form={form} formField={formField} />
                            </Grid.Col>
                          )
                      )}
                    </Grid>
                  ),
                },
                {
                  key: '2',
                  props: { label: 'Contact' },
                  content: (
                    <Grid className={classes.formContainer}>
                      {contactStepJson.map(
                        (formField) =>
                          formField.name !== 'role' &&
                          formField.name !== 'rootSpaces' && (
                            <Grid.Col
                              // style={{ height: '100%' }}
                              span={{
                                xs: formField.col?.xs || 12,
                              }}
                              key={formField.id}
                            >
                              <FormFields form={form} formField={formField} />
                            </Grid.Col>
                          )
                      )}
                    </Grid>
                  ),
                },
                {
                  key: '3',
                  props: { label: 'Login/Complete' },
                  content: (
                    <Grid className={classes.formContainer}>
                      {completeStepJson.map(
                        (formField) =>
                          formField.name !== 'role' &&
                          formField.name !== 'rootSpaces' && (
                            <Grid.Col
                              span={{
                                xs: 12,
                              }}
                              key={formField.id}
                            >
                              <FormFields form={form} formField={formField} />
                            </Grid.Col>
                          )
                      )}
                    </Grid>
                  ),
                },
              ]}
              completeStep={
                <Card className={classes.sumCard}>
                  <Text component="h2" mb={8}>
                    Summary
                  </Text>
                  {maintainersTableData.map((formField) => (
                    <>
                      {values[formField.name] && (
                        <Group style={{}}>
                          <Text> {formField.label}</Text>
                          <Text> {values[formField.name]}</Text>
                        </Group>
                      )}
                    </>
                  ))}
                </Card>
              }
              sumCard={
                <Card className={classes.sumCard}>
                  <Text component="h2" mb={8}>
                    Summary
                  </Text>
                  {maintainersTableData.map((formField) => (
                    <>
                      <Group style={{}}>
                        <Text> {formField.label}: </Text>
                        <Text> {values[formField.name]}</Text>
                      </Group>
                    </>
                  ))}
                </Card>
              }
            />

            {/* <Group className={classes.buttonContainer} justify="right">
                <Button className={classes.button} variant="gradient" type="submit">
                  Register
                </Button>
                <Button className={classes.button} variant="outline">
                  Cancel
                </Button>
              </Group> */}
          </form>
        </div>
      )}
    </Transition>
  );
};
