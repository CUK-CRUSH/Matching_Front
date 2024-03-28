import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { PropsWithChildren } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

//ErrorFallback ui 수정 필요

const ApiErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (!isAxiosError(error)) {
    throw error;
  }

  return <button onClick={resetErrorBoundary}>다시시도</button>;
};

const ApiErrorBoundary = ({ children }: PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();
  const key = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ApiErrorFallback} onReset={reset} resetKeys={[key]}>
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;
