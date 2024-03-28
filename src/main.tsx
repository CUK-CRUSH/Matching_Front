import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import './index.css';

import router from '@/router';

const queryClient = new QueryClient();

const isDevEnvironment = import.meta.env.DEV;

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
        {isDevEnvironment && <ReactQueryDevtools />}
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>,
  );
});
