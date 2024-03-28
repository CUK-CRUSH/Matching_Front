import { createBrowserRouter, Outlet } from 'react-router-dom';

import RootErrorBoundary from '@/pages/common/components/RootErrorHandler';
import RootSuspense from '@/pages/common/components/RootSuspense';
import ErrorPage from '@/pages/error/components/ErrorPage';
import NotFoundPage from '@/pages/error/components/NotFoundPage';
import Home from '@/pages/home';
import Survey from './pages/Survey';
import Result from './pages/result';
import { Toaster } from './components/ui/toaster';
import Result2 from './pages/result2/components/index';

const pageRoutes = {
  main: '/',
  survey: '/survey',
  result: '/result',
  result2: '/result2',
};

const CommonLayout = () => (
  <RootErrorBoundary>
    <RootSuspense>
      <Outlet />
      <Toaster />
    </RootSuspense>
  </RootErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },
      {
        path: pageRoutes.survey,
        element: <Survey />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.result,
        element: <Result />,
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.result2,
        element: <Result2 />,
        errorElement: <ErrorPage />,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
