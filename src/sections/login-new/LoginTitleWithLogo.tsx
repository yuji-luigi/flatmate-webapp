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
      <Group style={{ position: 'relative' }} justify="space-between" align="baseline">
        <Title order={2} className={classes.title} ta="center">
          {t('Welcome back to Flatmate!')}
        </Title>
        <LogoSquare className={classes.logo} size={60} />
      </Group>
    </>
  );
};
