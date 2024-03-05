import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import LoadingScreen from '../components/screen/LoadingScreen';

const LogoutPage = () => {
  const { logout } = useAuth();
  useEffect(() => {
    handleLogout();
  }, []);
  const handleLogout = async () => {
    logout();
  };
  return <div>jfioa</div>;
  return <LoadingScreen />;
};

export default LogoutPage;
