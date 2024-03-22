import { Card, Title, Button, Group } from "@mantine/core";
import React from "react";
import { CheckType } from "../../../../types/models/maintenance-check-type";
import classes from "./ChooseTypeCard.module.css";

export const ChooseTypeCard = ({
  setCheckType,
}: {
  setCheckType: (type: CheckType | null) => void;
}) => {
  return (
    <Card px={32} py={40}>
      <Title mb={32}>Upload Invoice or Receipt?</Title>

      <Group className={classes.buttonContainer}>
        <Button
          onClick={() => setCheckType("invoices")}
          className={classes.button}
          variant="light"
          color="blue"
        >
          Invoice
        </Button>
        <Button
          onClick={() => setCheckType("receipts")}
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
