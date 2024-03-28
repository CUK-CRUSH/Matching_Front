import { PropsWithChildren, Suspense } from 'react';

//TODO LoadingPage 추가하면 교체

const RootSuspense = ({ children }: PropsWithChildren) => {
  return <Suspense fallback={<>로딩중</>}>{children}</Suspense>;
};

export default RootSuspense;
