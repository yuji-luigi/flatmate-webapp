import { Checkbox, Paper, Title, Text, Container, Group, Button, Flex } from '@mantine/core';

import Link from 'next/link';

import { useForm } from '@mantine/form';
import { notifications, showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { set } from 'nprogress';
import useAuth from '../../../hooks/useAuth';

import { RegisterData } from '../../types/context/auth/useAuth';
import { Icons } from '../../data/icons/icons';
import SignUpStepOne from './SignUpStepOne';
import SignUpStepTwo from './SignUpStepTwo';
import classes from './SignUpForm.module.css';
import { IInitialValues, initialValues } from './defaultValues';
import SignUpConfirm from './SignUpConfirm';
import { sleep } from '../../utils/helpers/helper-functions';
import { useLocale } from '../../../hooks/useLocale';

const MAX_STEP = 2;

export function SignUpForm() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [steps, setSteps] = useState(0);
  const form = useForm<IInitialValues>({ initialValues });
  const { t } = useLocale('sign-up');
  const onSubmit = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      // const {email, password, name, surname} = data;
      await register(data);
      notifications.show({
        title: 'Registered!',
        message: t('successMsg'),
        color: 'green',
        icon: <Icons.check />,
        autoClose: 2000,
        id: 'register-success',
      });
      await sleep(750);
      router.push('/choose-root-space');
    } catch (error: any) {
      showNotification({
        title: 'Error',
        color: 'red',
        icon: <Icons.alert />,
        message: error.message || error || 'connection error',
        autoClose: 2000,
      });
      await sleep(750);
      console.error(error.message || error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNext = () => {
    if (steps >= MAX_STEP) {
      setSteps(0);
      return;
    }
    setSteps(steps + 1);
  };
  const handlePrev = () => {
    if (steps <= 0) {
      setSteps(0);
      return;
    }
    setSteps(steps - 1);
  };

  return (
    <Container size={420} my={40}>
      <Title
        className={classes.title}
        ta="center"
        // style={(theme) => ({ font-family: Greycliff CF, var(--mantine-font-family), fontWeight: 900 })}
      >
        {t('Register')}
      </Title>
      <Text color="dimmed" size="sm" ta="center" mt={5}>
        {t('Already have an account?')} <Link href="/login">{t('Login')}</Link>
      </Text>
      <Paper withBorder shadow="md" p={24} mt={10} radius="md">
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <fieldset aria-disabled={isLoading} className="fieldset">
            {steps === 0 && <SignUpStepOne form={form} />}
            {steps === 1 && <SignUpStepTwo form={form} />}
            {steps === MAX_STEP && <SignUpConfirm form={form} />}
          </fieldset>

          <Flex mt="xl" gap="md">
            <Button disabled={steps <= 0} type="button" fullWidth onClick={handlePrev} mt="xl">
              {t('Prev')}
            </Button>
            <Button
              disabled={steps >= MAX_STEP}
              type="button"
              fullWidth
              onClick={handleNext}
              mt="xl"
            >
              {t('Next')}
            </Button>
          </Flex>
          {steps === MAX_STEP && (
            <>
              <Button type="submit" fullWidth mt="xs">
                {t('Register')}
              </Button>
            </>
          )}
        </form>
      </Paper>
    </Container>
  );
}
