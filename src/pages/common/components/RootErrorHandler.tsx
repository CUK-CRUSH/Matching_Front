import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@/pages/error/components/ErrorPage';
import { PropsWithChildren } from 'react';

const RootErrorBoundary = ({ children }: PropsWithChildren) => {
  return <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>;
};

export default RootErrorBoundary;
