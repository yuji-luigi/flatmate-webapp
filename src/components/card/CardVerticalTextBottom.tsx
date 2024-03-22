import { Card, Text, Group, Box, BackgroundImage, MantineStyleProp } from "@mantine/core";
import Link from "next/link";
import { PATH_IMAGE } from "../../lib/image-paths";
import { UploadModel } from "../../types/models/upload-model";
import classes from "./CardVerticalTextBottom.module.css";
import { UserModel } from "../../types/models/space-model";

export interface CardData {
  _id: string;
  name: string;
  address?: string;
  createdAt: string;
  user?: UserModel;
  cover?: UploadModel;
}

interface CardArticleImageDescFooterVerticalProps {
  // image?: string;
  // category: string;
  // title: string;
  // date: string;
  href?: string;
  onClick?: () => void;
  style?: MantineStyleProp;

  data: CardData;
  // data: SpaceModel | OrganizationModel;
}
export function CardArticleVerticalTextBottom({
  // image,
  // title,
  data,
  href,
  style,
  onClick,
}: CardArticleImageDescFooterVerticalProps) {
  // const description =
  //   data.description?.length > 50 ? `${data.description.substring(0, 50)}...` : data.description;
  const content = (
    <Card withBorder radius="md" p={0} className={classes.card} onClick={onClick} style={style}>
      <BackgroundImage
        className={classes.bgImage}
        src={data.cover?.url || PATH_IMAGE.rootSpaceCard1}
        radius="sm"
      >
        <Box className={classes.bgImageGradient} />

        <div className={classes.body}>
          <Text className={`${classes.title} ${classes.appear} ${classes.text}`}>{data.name}</Text>
          <Text
            className={`${classes.appear} ${classes.text}`}
            tt="uppercase"
            c="dimmed"
            fw={700}
            size="xs"
          >
            {data.address}
          </Text>
          <Group wrap="nowrap" className={classes.appear} gap="xs">
            <Group gap="xs" wrap="nowrap">
              {/* <Avatar size={20} src={''} /> */}
              <Text className={classes.text} size="xs">
                {data.user?.name}
              </Text>
            </Group>
            {data.createdAt && (
              <>
                <Text className={classes.text} size="xs" color="dimmed">
                  •
                </Text>
                <Text size="xs" color="dimmed">
                  {data.createdAt}
                </Text>
              </>
            )}
          </Group>
        </div>
      </BackgroundImage>
    </Card>
  );
  // if (!href && onClick) {
  //   return content;
  // }
  if (href) {
    return (
      <Link href={href} className={classes.link}>
        {content}
      </Link>
    );
  }
  return content;
}
