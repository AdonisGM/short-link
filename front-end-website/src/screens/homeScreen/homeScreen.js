import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen = ({ title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login')
  };

  return (
    <div>
      <h1>Home Screen</h1>
      <Button onPress={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomeScreen;
