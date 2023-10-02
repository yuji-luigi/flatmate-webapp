import {
  ActionIcon,
  ActionIconProps,
  Group,
  MantineNumberSize,
  MantineStyleSystemProps,
  SpacingValue,
  Sx,
  SystemProp,
  useMantineColorScheme,
  Variants,
} from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

type Props = {
  variant?: Variants<
    'subtle' | 'filled' | 'outline' | 'light' | 'default' | 'transparent' | 'gradient'
  >;
  mt?: SystemProp<SpacingValue>;
  size?: MantineNumberSize;
  sx?: Sx;
  className?: string;
};
export function ColorSchemeToggle(props: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { sx, className } = props;
  return (
    <Group className={className} position="center" sx={sx} mt={props.mt}>
      <ActionIcon
        onClick={() => toggleColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
        size={props.size || 'xl'}
        variant={props.variant || 'filled'}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'light' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colors.yellow[4],
          // color: theme.colorScheme === 'light' ? theme.colors.yellow[4] : theme.colors.blue[6],
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
        })}
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
