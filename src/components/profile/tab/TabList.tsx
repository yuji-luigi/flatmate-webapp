import { Box, Group, Tabs } from '@mantine/core';
import React from 'react';
import { SettingButtonSpaceHome } from '../../../sections/@dashboard/dashboard_top/components/SettingButtonSpaceHome';
import { useCustomMQuery } from '../../../../hooks/useCustomMQuery';

interface List {
  icon: React.ReactNode;
  label: string;
  value: string;
  component: () => JSX.Element;
  // component: React.ReactNode;
}
export const TabList = ({ list, spaceSetting }: { spaceSetting?: boolean; list: List[] }) => {
  const { isMobile } = useCustomMQuery();
  return (
    <Tabs.List position="left">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Group>
          {list.map((item) => (
            <Tabs.Tab icon={item.icon} value={item.value} key={item.label}>
              {isMobile ? '' : item.label}
            </Tabs.Tab>
          ))}
        </Group>
        {spaceSetting && (
          // <Box sx={{ justifySelf: 'end', width: '100%' }}>
          <SettingButtonSpaceHome />
          // </Box>
        )}
      </Box>
    </Tabs.List>
  );
};
