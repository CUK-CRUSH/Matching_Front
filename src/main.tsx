import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// @ts-ignore
import { firebaseConfig } from '@/Firebase';

import './index.css';

import router from '@/router';

import Layout from '@/components/layout/layout';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

const appKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;

if (appKey) {
  const script = document.createElement('script');
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services,clusterer`;
  script.async = true;
  document.head.appendChild(script);
} else {
  console.error('Kakao Map API Key is missing');
}

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/brwoser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Toaster />
          {isDevEnvironment && <ReactQueryDevtools />}
          <RouterProvider router={router} />
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>,
  );
});
