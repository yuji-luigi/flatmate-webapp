import { ActionIcon, Group, MantineStyleProp, useMantineColorScheme } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import classes from './ColorSchemeToggle.module.css';

type Props = {
  variant?: string;
  mt?: number;
  size?: number;
  style?: MantineStyleProp;
  className?: string;
};

export function ColorSchemeToggle(props: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { style, className } = props;
  return (
    <Group className={className} justify="center" style={style} mt={props.mt}>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size={props.size || 'xl'}
        variant={props.variant || 'filled'}
        className={classes.icon}
        // style={(theme) => ({
        //   backgroundColor:
        //    light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
        //   color: var(--mantine-color-yellow-4),
        //   // color: theme.colorScheme === 'light' ? var(--mantine-color-yellow-4) : theme.colors.blue[6],
        //   borderColor: light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-5)),
        // })}
      >
        {colorScheme === 'dark' ? (
          <SunIcon width={20} height={20} />
        ) : (
          <MoonIcon width={20} height={20} />
        )}
      </ActionIcon>
    </Group>
  );
}
