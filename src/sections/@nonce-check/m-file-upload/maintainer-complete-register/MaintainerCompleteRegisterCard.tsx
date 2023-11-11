import { Button, Card, Grid, Group, Title, Transition } from '@mantine/core';
import React from 'react';
import { useForm } from '@mantine/form';
import FormFields from '../../../../components/input/FormFields';
import classes from './MaintainerCompleteRegisterCard.module.css';
import { maintainersTableData } from '../../../../../json/dataTable/formfields/maintainersTableData';
import { getDefaultValues } from '../../../../utils/getDefaultValues';
import { useCrudSelectors } from '../../../../redux/features/crud/crudSlice';
import { MaintainerModel } from '../../../../types/models/maintainer-model';
import { StepperDemo } from '../../../../components/stepper/StepperDemo';
import { StepperGeneric } from '../../../../components/stepper/StepperGeneric';
import { PasswordFormType } from '../../../../types/general/data/data-table/formField-types';

export const MaintainerCompleteRegisterCard = (props: { isCompleteRegister: boolean }) => {
  const { isCompleteRegister } = props;
  const { crudDocument: maintainer } = useCrudSelectors<MaintainerModel>('maintainers');
  const defaultValues = getDefaultValues(maintainersTableData, maintainer);
  const form = useForm({
    initialValues: { ...defaultValues },
  });
  let _maintainersTableData = maintainersTableData.map((formField) => {
    const _formField = structuredClone(formField);
    return _formField;
  });
  _maintainersTableData = _maintainersTableData.filter(
    (formField) => formField.name !== 'password'
  );

  return (
    <Transition
      mounted={isCompleteRegister}
      duration={500}
      transition="slide-up"
      timingFunction="ease-in-out"
    >
      {(styles) => (
        <div style={styles}>
          <Card px={32} py={40}>
            <Title mb={8}>Register To Flatmates</Title>
            <form onSubmit={() => {}}>
              <StepperGeneric
                steps={[
                  {
                    key: '1',
                    props: { label: 'Step 1' },
                    content: (
                      <Grid className={classes.formContainer}>
                        {_maintainersTableData.map(
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
                    key: '1',
                    props: { label: 'Step 1' },
                    content: (
                      <Grid className={classes.formContainer}>
                        {[
                          {
                            id: 'password',
                            name: 'password',
                            type: 'password',
                          } as PasswordFormType,
                        ].map(
                          (formField) =>
                            formField.name !== 'role' &&
                            formField.name !== 'rootSpaces' && (
                              <Grid.Col
                                span={{
                                  xs: 12,
                                  sm: 6,
                                  lg: 6,
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
                completeStep={<>completed</>}
              />

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
        </div>
      )}
    </Transition>
  );
};
