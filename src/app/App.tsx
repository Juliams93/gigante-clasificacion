import { BrowserRouter, Routes, Route } from 'react-router';
import { lazy, Suspense } from 'react';
import HomePage from './pages/HomePage';

const GigantePage = lazy(() => import('./pages/GigantePage'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/gigante" element={<GigantePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
