import React from 'react';
import { Card, CardProps } from '@mantine/core';
import classes from './CardStyled.module.css';

type Props = {
  children: React.ReactNode;
} & CardProps;
export const CardStyled = (props: Props) => {
  return <Card className={classes.card}>{props.children}</Card>;
};
