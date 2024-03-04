import React from 'react';
import { Button } from '@mantine/core';
import Link from 'next/link';
import useAuth from '../../../hooks/useAuth';
import { _PATH_FRONTEND } from '../../path/path-frontend';

const MaintainerDashboardRoot = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.name} {user?.surname}
      <Button component={Link} href={_PATH_FRONTEND.auth.logout}>
        logout
      </Button>
    </div>
  );
};

export default MaintainerDashboardRoot;
