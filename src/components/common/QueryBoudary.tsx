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
