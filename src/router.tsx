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
import OnBoardingpage from '@/pages/onBoarding';
import MatchingListPage from '@/pages/matchingList';
import ReceivedHeart from '@/pages/heart/receivedHeart';
import SendedHeart from '@/pages/heart/sendedHeart';
import ReceivedMessage from '@/pages/message/receivedMessage';
import SendedMessage from '@/pages/message/sendedMessage';
import MyPage from '@/pages/Mypage';
import OpenedProfileCard from '@/pages/OpenedProfileCard';
import ViewProfileCard from './components/matchingList/ViewProfileCard';

const pageRoutes = {
  main: '/',
  login: '/login',
  matching: '/matching',
  openedProfileCard : '/matching/openedProfileCard',
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
      { path: pageRoutes.main, element: <Home />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },

  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.login, element: <LoginPage />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },

  {
    path: "/matching",
    element: <CommonLayout />,
    children: [
      { path: "", element: <ProfileCard />, errorElement: <ErrorPage /> },
      { path: ":profileId", element: <ViewProfileCard />, errorElement: <ErrorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.openedProfileCard, element: <OpenedProfileCard />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.terms, element: <TermsPage />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.onBoarding, element: <OnBoardingpage />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.matchingList, element: <MatchingListPage />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.receivedHeart, element: <ReceivedHeart />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.sendedHeart, element: <SendedHeart />, errorElement: <ErrorPage /> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      {
        path: pageRoutes.receivedMessage,
        element: <ReceivedMessage />,
        errorElement: <ErrorPage />,
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.sendedMessage, element: <SendedMessage />, errorElement: <ErrorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <CommonLayout />,
    children: [
      { path: pageRoutes.myPage, element: <MyPage />, errorElement: <ErrorPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
