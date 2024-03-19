import { Box, Button, Text } from "@mantine/core";
import Link from "next/link";
import { PATH_CLIENT } from "../../../path/path-frontend";
import { FeedCardData } from "../../../types/components-types/feed/post-feed-card-type";
import { truncateString } from "../../../utils/helpers/truncateString";
import classes from "./FeedDescription.module.css";

type FeedDescriptionProps = {
  data: FeedCardData;
  popupFn?: () => void;
  className?: string;
  textLength?: number;
  showFullText?: boolean;
};

export const FeedDescription = (props: FeedDescriptionProps) => {
  const { className, popupFn, textLength = 500, showFullText } = props;
  const { description = "", entity, _id } = props.data;
  const fullText = description;

  const _description = showFullText ? fullText : truncateString(description, textLength);
  // const _description = showFullText ? fullText : description.slice(0, textLength);

  const readMore = "...Read more";
  // const readMore = description.length > textLength ? '...Read more' : 'Read more';

  const link = popupFn ? (
    <Button variant="light" onClick={popupFn}>
      {readMore}
    </Button>
  ) : (
    <Link
      className={classes.link}
      href={`${PATH_CLIENT[entity]}/${_id}`}
      as={`${PATH_CLIENT[entity]}/${_id}`}
    >
      {readMore}
    </Link>
  );
  return (
    <Box className={`${className} `}>
      <Text>{_description}</Text>
      <Text ta="end">{!showFullText && link}</Text>
    </Box>
  );
};
