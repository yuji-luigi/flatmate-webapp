import { 
   Text, Title, TextInput, Button, Image, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    align-items: 'center',
    padding: `calc(${var(--mantine-spacing-xl} * 2)`,
    border-radius: --mantine-radius-md,
    background-color: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    @media (max-width: 768px): {
      flex-direction: 'column-reverse',
      padding: var(--mantine-spacing-xl,
    },
  },

  image: {
    max-width: '40%',

    @media (max-width: 768px): {
      max-width: '100%',
    },
  },

  body: {
    padding-right: `calc(${var(--mantine-spacing-xl} * 4)`,

    @media (max-width: 768px): {
      padding-right: 0,
      margin-top: var(--mantine-spacing-xl,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: var(--mantine-spacing-md,
  },

  controls: {
    display: 'flex',
    margin-top: var(--mantine-spacing-xl,
  },

  inputWrapper: {
    width: '100%',
    flex: '1',
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export function EmailBanner() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Wait a minute...</Title>
        <Text fw={500} fz="lg" mb={5}>
          Subscribe to our newsletter!
        </Text>
        <Text fz="sm" c="dimmed">
          You will never miss important product updates, latest news and community QA sessions. Our
          newsletter is once a week, every Sunday.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Subscribe</Button>
        </div>
      </div>
      <Image src="./email_banner.svg" className={classes.image} />
    </div>
  );
}
