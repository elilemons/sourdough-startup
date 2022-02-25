import { Route, Routes } from 'react-router-dom';
import App from '../../../App';
import { FeedingContainer } from '../../features/feeding/components/FeedingContainer';
import { Home } from '../../pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/' element={<App />} />
      <Route path='/feeding' element={<FeedingContainer />} />
    </Routes>
  );
}
