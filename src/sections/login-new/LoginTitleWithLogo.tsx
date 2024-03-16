import { Group, Title } from '@mantine/core';
import { LogoSquare } from '../../components/banner/LogoSquare';
import classes from './LoginTitleWithLogo.module.css';
import { useLocale } from '../../../hooks/useLocale';

type LoginTitleWithLogoProps = {};

export const LoginTitleWithLogo: React.FC<LoginTitleWithLogoProps> = (
  props: LoginTitleWithLogoProps
) => {
  const { t } = useLocale('login');
  return (
    <>
      <Group
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr minmax(10px, 60px)',
          placeItems: 'center',
        }}
        justify="space-between"
        align="baseline"
      >
        <Title order={2} className={classes.title}>
          {t('Welcome back to Flatmate!')}
        </Title>
        <LogoSquare size={60} />
      </Group>
    </>
  );
};
