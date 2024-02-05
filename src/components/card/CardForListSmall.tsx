import { Card, Image, Avatar, Text, Group, Box } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Url } from 'next/dist/shared/lib/router/router';
import { IUser } from '../../types/context/auth/useAuth';
import classes from './CardArticleSmall.module.css';

interface CardArticleImageDescFooterVerticalProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  href: Url;
  createdBy?: IUser;
  createdAt?: Date | string;
}
export function CardForListSmall(props: CardArticleImageDescFooterVerticalProps) {
  const { image, title, subtitle, description, href, createdBy, createdAt } = props;

  const router = useRouter();
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Link href={href} className={classes.link}>
        <Group wrap="nowrap" gap={0}>
          {image && <Image src={image} height={150} width={140} />}
          <div className={classes.body}>
            <Box style={{ overflow: 'hidden' }}>
              <Text className={classes.title} mt="xs" mb="xs">
                {title}
              </Text>
              <Text tt="uppercase" color="dimmed" fw={700} size="xs">
                {subtitle}
              </Text>
              <Text tt="uppercase" color="dimmed" fw={700} size="xs">
                {description}
              </Text>
            </Box>
            <Group wrap="nowrap" gap="xs">
              {createdBy && (
                <Group gap="xs" wrap="nowrap">
                  <Avatar size={20} src={createdBy.avatar?.url} />
                  <Text size="xs">{createdBy.name}</Text>
                </Group>
              )}
              {createdAt && (
                <>
                  <Text size="xs" color="dimmed">
                    •
                  </Text>
                  <Text size="xs" color="dimmed">
                    {createdAt.toString()}
                  </Text>
                </>
              )}
            </Group>
          </div>
        </Group>
      </Link>
    </Card>
  );
}
