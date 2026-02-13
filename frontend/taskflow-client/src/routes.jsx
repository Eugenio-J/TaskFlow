// src/routes.jsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import Spinner from './components/common/Spinner/Spinner';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const LoginPage = lazy(() => import('./pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/Dashboard/DashboardPage'));
const PlaygroundPage = lazy(() => import('./pages/Playground/PlaygroundParent'));
const ProjectsPage = lazy(() => import('./pages/Projects/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/Projects/ProjectDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFoundPage'));

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Spinner size="lg" />
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: 'login', element: <PublicRoute><Suspense fallback={<PageLoader />}><LoginPage /></Suspense></PublicRoute> },
      { path: 'register', element: <PublicRoute><Suspense fallback={<PageLoader />}><RegisterPage /></Suspense></PublicRoute> },
      { path: 'dashboard', element: <ProtectedRoute><Suspense fallback={<PageLoader />}><DashboardPage /></Suspense></ProtectedRoute> },
      { path: 'playground', element: <ProtectedRoute><Suspense fallback={<PageLoader />}><PlaygroundPage /></Suspense></ProtectedRoute> },
      { path: 'projects', element: <ProtectedRoute><Suspense fallback={<PageLoader />}><ProjectsPage /></Suspense></ProtectedRoute> },
      { path: 'projects/:id', element: <ProtectedRoute><Suspense fallback={<PageLoader />}><ProjectDetailPage /></Suspense></ProtectedRoute> },
      { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
]);