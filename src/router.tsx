import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootErrorBoundary from '@/pages/common/components/RootErrorHandler';
import RootSuspense from '@/pages/common/components/RootSuspense';
import ErrorPage from '@/pages/error/components/ErrorPage';
import NotFoundPage from '@/pages/error/components/NotFoundPage';
import Home from '@/pages/home';
import { Toaster } from '@/components/ui/toaster';
import LoginPage from '@/pages/login';
import ProfileCard from '@/pages/matching';
import TermsPage from '@/pages/Terms';
import MatchingListPage from '@/pages/matchingList';
import ReceivedHeart from '@/pages/heart/receivedHeart';
import SendedHeart from '@/pages/heart/sendedHeart';
import ReceivedMessage from '@/pages/message/receivedMessage';
import SendedMessage from '@/pages/message/sendedMessage';
import MyPage from '@/pages/Mypage';
import OpenedProfileCard from '@/pages/OpenedProfileCard';
import OnBoardingPage from '@/pages/onBoarding';
import ProtectedRoute from './privateRouter';
import PublicRoute from './publicRouter';
import ViewProfileCard from './components/ViewProfile/ViewProfileCard';

const pageRoutes = {
  main: '/',
  login: '/login',
  matching: '/matching',
  openedProfileCard: '/matching/openedProfileCard',
  terms: '/terms',
  onBoarding: '/onboarding',
  matchingList: '/matchingList',
  receivedHeart: '/matchingList/receivedHeart',
  sendedHeart: '/matchingList/sendedHeart',
  receivedMessage: '/matchingList/receivedMessage',
  sendedMessage: '/matchingList/sendedMessage',
  myPage: '/mypage',
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
      {
        path: pageRoutes.main,
        element: (
          <PublicRoute>
            <Home />
          </PublicRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.login,
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.onBoarding,
        element: (
          <PublicRoute>
            <OnBoardingPage />
          </PublicRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.terms,
        element: (
          <PublicRoute>
            <TermsPage />
          </PublicRoute>
        ),
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      {
        path: '/matching',
        element: (
          <ProtectedRoute>
            <ProfileCard />
          </ProtectedRoute>
        ),

        errorElement: <ErrorPage />,
      },
      {
        path: '/matching/:profileId',
        element: (
          <ProtectedRoute>
            <ViewProfileCard />
          </ProtectedRoute>
        ),

        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.openedProfileCard,
        element: (
          <ProtectedRoute>
            <OpenedProfileCard />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.matchingList,
        element: (
          <ProtectedRoute>
            <MatchingListPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.receivedHeart,
        element: (
          <ProtectedRoute>
            <ReceivedHeart />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.sendedHeart,
        element: (
          <ProtectedRoute>
            <SendedHeart />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.receivedMessage,
        element: (
          <ProtectedRoute>
            <ReceivedMessage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.sendedMessage,
        element: (
          <ProtectedRoute>
            <SendedMessage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: pageRoutes.myPage,
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
