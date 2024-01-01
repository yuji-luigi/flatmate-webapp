import { Divider, Group, Stack, Text } from '@mantine/core';
import React from 'react';

const SimpleRow = ({
  title,
  content,
  top = false,
}: {
  title: string;
  content: string | number;
  top?: boolean;
}) => {
  return (
    <>
      {top && <Divider />}
      <Group mt={8} style={{ justifyContent: 'space-between' }}>
        <Text fw={600}>{title}:</Text>
        <Text fw={600}>{content}</Text>
      </Group>
      <Divider mt={4} />
    </>
  );
};

export default SimpleRow;
