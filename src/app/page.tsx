'use client';

import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import PlausibleProvider from 'next-plausible';
import { Main } from '../components/Main';
import { ErrorFallback } from '../components/ErrorFallback';
import { SUSPENSE_FALLBACK } from '../components/SuspenseFallback';

import '../styles/global.scss';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function Page() {
  const { reset } = useQueryErrorResetBoundary();
  const domain = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.host;
    }
    return undefined;
  }, []);
  return (
    <PlausibleProvider domain={domain} trackFileDownloads trackOutboundLinks>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
          <Suspense fallback={SUSPENSE_FALLBACK}></Suspense>
          <Main />
        </ErrorBoundary>
      </QueryClientProvider>
    </PlausibleProvider>
  );
}
