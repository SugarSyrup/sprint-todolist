"use client";

import { QueryBoundary } from "../common/QueryBoudary";

export function TodoDetailSection() {
  return (
    <QueryBoundary
      loadingFallback={<>loading</>}
      renderError={(onRetry) => <>error</>}
    >
      <span>Todo Detail</span>
    </QueryBoundary>
  );
}
