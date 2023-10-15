import {
  createStyles,
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import { ContactIconsList } from './ContactIcons';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    backgroundImage: `linear-gradient(-60deg, ${theme.colors[theme.primaryColor][4]} 0%, ${
      theme.colors[theme.primaryColor][7]
    } 100%)`,
    border-radius: --mantine-radius-md,
    padding: `calc(${var(--mantine-spacing-xl} * 2.5)`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      padding: `calc(${var(--mantine-spacing-xl} * 1.5)`,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    max-width: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      max-width: '100%',
    },
  },

  form: {
    background-color: theme.white,
    padding: var(--mantine-spacing-xl,
    border-radius: --mantine-radius-md,
    boxShadow: theme.shadows.lg,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    background-color: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    background-color: theme.colors[theme.primaryColor][6],
  },
}));

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

export function ContactUs() {
  const { classes } = useStyles();

  const icons = social.map((Icon, index) => (
    <ActionIcon key={index} size={28} className={classes.social} variant="transparent">
      <Icon size={22} stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={2} spacing={50} breakpoints={[{ max-width: 'sm', cols: 1 }]}>
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>

          <ContactIconsList variant="white" />

          <Group mt="xl">{icons}</Group>
        </div>
        <div className={classes.form}>
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <TextInput
            label="Name"
            placeholder="John Doe"
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />
          <Textarea
            required
            label="Your message"
            placeholder="I want to order your goods"
            minRows={4}
            mt="md"
            classNames={{ input: classes.input, label: classes.inputLabel }}
          />

          <Group position="right" mt="md">
            <Button className={classes.control}>Send message</Button>
          </Group>
        </div>
      </SimpleGrid>
    </div>
  );
}
