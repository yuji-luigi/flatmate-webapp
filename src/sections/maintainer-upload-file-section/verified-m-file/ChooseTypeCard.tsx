import { Card, Title, Box, Button, Text, Group, createStyles } from '@mantine/core';
import React from 'react';
import { CheckType } from '../../../types/models/check-type';

const useStyles = createStyles((theme) => ({
  buttonContainer: {
    justifyContent: 'center',
  },
  button: {
    width: '45%',
  },
}));
export const ChooseTypeCard = ({
  setCheckType,
}: {
  setCheckType: (type: CheckType | null) => void;
}) => {
  const { classes } = useStyles();
  return (
    <Card px={32} py={40}>
      <Title mb={32}>Upload Invoice or Receipt?</Title>

      <Group className={classes.buttonContainer}>
        <Button
          onClick={() => setCheckType('invoices')}
          className={classes.button}
          variant="light"
          color="blue"
        >
          Invoice
        </Button>
        <Button
          onClick={() => setCheckType('receipts')}
          className={classes.button}
          variant="light"
          color="blue"
        >
          Receipt
        </Button>
      </Group>
    </Card>
  );
};
