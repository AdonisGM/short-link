import { Routes, Route } from 'react-router-dom';
import NoRequireAuth from './routersProtect/NoRequireAuth';
import RequireAuth from './routersProtect/RequireAuth';
import HomeScreen from './screens/homeScreen/homeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import NotFoundScreen from './screens/notFoundScreen/NotFoundScreen';
import ShortLinkGuest from './screens/shortLinkGuestScreen/ShortLinkGuestScreen';

function App() {
  return (
    <Routes>
      <Route
        path="/u/:idShortLink"
        element={<ShortLinkGuest title={'Short Link'} />}
      />
      <Route path="/" element={<RequireAuth><HomeScreen title={'Home | Short Link'} /></RequireAuth>} />
      <Route
        path="/login"
        element={<NoRequireAuth><LoginScreen title={'Login | Short Link'} /></NoRequireAuth>}
      />
      <Route
        path="/404"
        element={<NotFoundScreen title={'404 - Not Found'} />}
      />
      <Route path="*" element={<NotFoundScreen title={'404 - Not Found'} />} />
    </Routes>
  );
}

export default App;
