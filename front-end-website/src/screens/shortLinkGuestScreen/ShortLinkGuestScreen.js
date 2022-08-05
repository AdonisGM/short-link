import { useEffect } from 'react';
import ShortLinkGuest from '../../components/shortLinkGuest/shortLinkGuest';

const ShortLinkGuestScreen = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <ShortLinkGuest/>;
};

export default ShortLinkGuestScreen;
