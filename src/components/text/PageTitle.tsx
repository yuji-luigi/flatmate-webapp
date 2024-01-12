import { Group, Text } from '@mantine/core';
import React, { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import classes from './PageTitle.module.css';

export const PageTitle = ({ title = '', subtitle }: { title: string; subtitle?: string }) => {
  const { t } = useTranslation();
  return (
    <div className={classes.container}>
      <Text className={classes.title}>
        {t(title)}
        {subtitle && <span className={classes.subtitle}>{t(subtitle || '')}</span>}
      </Text>
    </div>
  );
};
