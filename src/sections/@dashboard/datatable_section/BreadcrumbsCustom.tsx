import { Breadcrumbs, createStyles } from '@mantine/core';
import Link from 'next/link';
import useLayoutContext from '../../../../hooks/useLayoutContext';

const useStyles = createStyles((theme) => ({
  link: {
    textDecoration: 'none',
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    border-radius: var(--mantine-radius-sm),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    fontStyle: 'normal',

    '&:hover': {
      background-color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-0)),
    },
  },
}));

export function BreadcrumbsCustom() {
  const { breadcrumbs } = useLayoutContext();
  const { classes } = useStyles();
  const items = breadcrumbs.map((item, index) => (
    <Link className={classes.link} href={item.href} key={index}>
      {item.title}
    </Link>
  ));

  return (
    <div>
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
    </div>
  );
}
