import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import LoginPage from './login';
import LoadingScreen from '../components/screen/LoadingScreen';
import { sleep } from '../utils/helpers/helper-functions';
import { _PATH_FRONTEND } from '../path/path-frontend';

const LogoutPage = () => {
  const { logout } = useAuth();
  useEffect(() => {
    handleLogout();
  }, []);
  const handleLogout = async () => {
    logout();
  };
  return <LoadingScreen />;
};

export default LogoutPage;
