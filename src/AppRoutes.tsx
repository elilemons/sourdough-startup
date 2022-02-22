import { Route, Routes } from 'react-router-dom';
import App from './App';
import { Home } from './app/pages/Home';

export function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<App />} />
      <Route index element={<Home />} />
    </Routes>
  );
}
