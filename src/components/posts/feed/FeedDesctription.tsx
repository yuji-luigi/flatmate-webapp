import { Button, Text } from '@mantine/core';
import Link from 'next/link';
import { PATH_CLIENT } from '../../../path/path-frontend';

type FeedDescriptionProps = {
  data: {
    body?: string;
    showFullText?: boolean;
    popupFn?: () => void;
    entity: 'maintenances' | 'posts';
    _id: string;
    textLength?: number;
  };
  className?: string;
};
export const FeedDescription = (props: FeedDescriptionProps) => {
  const { className } = props;
  const { body = '', showFullText, popupFn, entity, _id, textLength = 500 } = props.data;
  const fullText = body;

  let description = body?.length > textLength ? body.substring(0, textLength - 3) : body;
  description = showFullText ? fullText : description;
  const link = popupFn ? (
    <Button variant="light" onClick={popupFn}>
      ...Read more
    </Button>
  ) : (
    <Link href={`${PATH_CLIENT[entity]}/${_id}`} as={`${PATH_CLIENT[entity]}/${_id}`}>
      ...Read more
    </Link>
  );
  return (
    <Text className={className}>
      {description} {!showFullText && link}
    </Text>
  );
};
