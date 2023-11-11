import { useState } from 'react';
import { Stepper, Button, Group, StepperStepProps, Box } from '@mantine/core';
import classes from './StepperGeneric.module.css';

type StepperGenericProps = {
  steps: {
    key: string;
    props: StepperStepProps;
    content: React.ReactNode;
  }[];
  completeStep: React.ReactNode;
  buttons?: React.ReactNode;
};

export function StepperGeneric(props: StepperGenericProps) {
  const { steps, completeStep, buttons } = props;
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current <= steps.length ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Box className={classes.box}>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        {steps.map((step) => (
          <Stepper.Step key={step.key} {...step.props}>
            {step.content}
          </Stepper.Step>
        ))}
        <Stepper.Completed>{completeStep}</Stepper.Completed>
      </Stepper>

      {active >= steps.length ? (
        <Group className={classes.buttonContainer}>
          <Button className={classes.button} variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button className={classes.button} variant="gradient" type="submit">
            Confirm
          </Button>
        </Group>
      ) : (
        <Group className={classes.buttonContainer}>
          <Button className={classes.button} variant="outline" onClick={prevStep}>
            Back
          </Button>
          <Button className={classes.button} variant="gradient" onClick={nextStep}>
            Next step
          </Button>
        </Group>
      )}
    </Box>
  );
}
