import { useState } from 'react';
import { Stepper, Button, Group, StepperStepProps } from '@mantine/core';

type StepperGenericProps = {
  steps: {
    key: string;
    props: StepperStepProps;
    content: React.ReactNode;
  }[];
  completeStep: React.ReactNode;
};

export function StepperGeneric(props: StepperGenericProps) {
  const { steps, completeStep } = props;
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current <= steps.length ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false}>
        {steps.map((step) => (
          <Stepper.Step key={step.key} {...step.props}>
            {step.content}
          </Stepper.Step>
        ))}
        <Stepper.Completed>{completeStep}</Stepper.Completed>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
}
