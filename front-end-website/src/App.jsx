import { Routes, Route } from 'react-router-dom';
import NoRequireAuth from './routersProtect/NoRequireAuth';
import RequireAuth from './routersProtect/RequireAuth';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import NotFoundScreen from './screens/notFoundScreen/NotFoundScreen';
import ShortLinkGuest from './screens/shortLinkGuestScreen/ShortLinkGuestScreen';
import NavigationLayout from './components/layout/NavigationLayout';

function App() {
  return (
    <Routes>
      <Route
        path="/u/:idShortLink"
        element={<ShortLinkGuest title={'Short Link'} />}
      />
      <Route path="/" element={<NavigationLayout/>}>
        <Route index element={<RequireAuth><HomeScreen title={'Home | Short Link'} /></RequireAuth>} />
      </Route>      
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
