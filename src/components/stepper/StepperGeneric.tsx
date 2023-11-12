import { useState } from 'react';
import { Stepper, Button, Group, StepperStepProps, Box, Stack } from '@mantine/core';
import classes from './StepperGeneric.module.css';

type StepperGenericProps = {
  steps: {
    key: string;
    props: StepperStepProps;
    content: React.ReactNode;
  }[];
  completeStep: React.ReactNode;
  buttons?: React.ReactNode;
  sumCard?: React.ReactNode;
  classNames?: {
    buttonContainer?: string;
  };
};

export function StepperGeneric(props: StepperGenericProps) {
  const { steps, completeStep, buttons, classNames, sumCard } = props;
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current <= steps.length ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Box className={classes.main}>
      <Box className={classes.formSection}>
        <Stepper
          classNames={{
            root: classes.stepperRoot,
            steps: classes.steps,
            content: classes.stepContent,
          }}
          active={active}
          onStepClick={setActive}
          allowNextStepsSelect={false}
        >
          {steps.map((step) => (
            <Stepper.Step key={step.key} {...step.props}>
              {step.content}
            </Stepper.Step>
          ))}
          <Stepper.Completed>
            <Box className={classes.steps}>
              {completeStep}
              <Group mt={16}>
                <Button style={{ flex: 1 }} variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button style={{ flex: 1 }} variant="gradient" type="submit">
                  Confirm
                </Button>
              </Group>
            </Box>
          </Stepper.Completed>
        </Stepper>
      </Box>
      {active < steps.length && (
        <Box className={classes.sumSection}>
          {active < steps.length && sumCard}
          <Box className={classNames?.buttonContainer || classes.buttonContainer}>
            {active >= steps.length ? (
              <>
                <Button className={classes.button} variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button className={classes.button} variant="gradient" type="submit">
                  Confirm
                </Button>
              </>
            ) : (
              <>
                <Button className={classes.button} variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button className={classes.button} variant="gradient" onClick={nextStep}>
                  Next step
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}
