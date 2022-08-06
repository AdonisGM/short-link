import { useEffect } from 'react';

const HomeScreen = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <h1>Home Screen</h1>
    </div>
  );
};

export default HomeScreen;
