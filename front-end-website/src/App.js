import { Routes, Route } from 'react-router-dom';
import NotFoundScreen from './screens/notFoundScreen/notFoundScreen';
import ShortLinkGuest from './screens/shortLinkGuestScreen/ShortLinkGuestScreen';

function App() {
  return (
    <Routes>
      <Route
        path="/u/:idShortLink"
        element={<ShortLinkGuest title={'Short Link'} />}
      />
      <Route path="/404" element={<NotFoundScreen title={'404 - Not Found'}/>} />
      <Route path="*" element={<NotFoundScreen title={'404 - Not Found'}/>} />
    </Routes>
  );
}

export default App;
