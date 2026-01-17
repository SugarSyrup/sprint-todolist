// children에서 시행되는 Suspense와 Error에 대한 책임 분리 ( 컴포넌트 단위 )

"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

interface QueryBoundaryProps {
  children: React.ReactNode;
  loadingFallback: React.ReactNode;
  renderError: (onRetry: () => void) => React.ReactNode;
}

export function QueryBoundary({
  children,
  loadingFallback,
  renderError,
}: QueryBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ resetErrorBoundary }) =>
            renderError(resetErrorBoundary)
          }
          onReset={reset}
        >
          <Suspense fallback={loadingFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
