import { useEffect } from 'react';
import NotFound from '../../components/notFound/NotFound';

const NotFoundScreen = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <NotFound />;
};

export default NotFoundScreen;
