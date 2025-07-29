import { Routes, Route } from 'react-router-dom' ;
import ShortenPage from './pages/shortenPage';
import StatsPage from './pages/statsPage';
import RedirectPage from './pages/RedirectPage';
import LoginPage from './pages/LoginPage';
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ShortenPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/:shortcode" element={<RedirectPage />} />
    </Routes>
  );
};

export default App;
