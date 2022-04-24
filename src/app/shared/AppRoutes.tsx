import { Route, Routes } from 'react-router-dom';

import App from '../../App';
import { FeedingContainer } from '../features/feeding/components/FeedingContainer';
import { LoafContainer } from '../features/loaf/components/LoafContainer';
import { StarterContainer } from '../features/starter/components/StarterContainer';
import { Home } from '../pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/' element={<App />} />
      <Route path='/feeding' element={<FeedingContainer />} />
      <Route path='/starter' element={<StarterContainer />} />
      <Route path='/loaf' element={<LoafContainer />} />
    </Routes>
  );
}
