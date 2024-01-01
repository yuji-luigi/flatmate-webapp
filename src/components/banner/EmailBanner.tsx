import { Text, Title, TextInput, Button, Image, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import classes from './EmailBanner.module.css';

export function EmailBanner() {
  const { t } = useTranslation('common');
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Text component="h3" className={classes.title}>
          {/* { Wait a minute...} */}
          {t('Subscription is not available yet...')}
        </Text>
        <Text fw={500} fz="lg" mb={5} className={classes.disabled}>
          Subscribe to our newsletter!
        </Text>
        <Text fz="sm" c="dimmed" className={classes.disabled}>
          You will never miss important product updates, latest news and community QA sessions. Our
          newsletter is once a week, every Sunday.
        </Text>
        <form>
          <div className={classes.controls}>
            <TextInput
              aria-disabled="true"
              placeholder="Your email"
              classNames={{ input: classes.input, root: classes.inputWrapper }}
            />
            <Button className={classes.control}>Subscribe</Button>
          </div>
        </form>
      </div>
      <Image src="./email_banner.svg" className={classes.image} alt="Subscribe image" />
    </div>
  );
}
