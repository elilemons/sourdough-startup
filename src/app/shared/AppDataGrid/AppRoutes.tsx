import { Route, Routes } from 'react-router-dom';
import App from '../../../App';
import { FeedingPage } from '../../pages/FeedingPage';
import { Home } from '../../pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route index element={<Home />} />
      <Route path='/feeding' element={<FeedingPage />} />
    </Routes>
  );
}
