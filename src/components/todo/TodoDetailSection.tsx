"use client";

import { QueryBoundary } from "../common/QueryBoudary";
import { TodoDetail } from "./todoDetail/TodoDetail";

export function TodoDetailSection() {
  return (
    <QueryBoundary
      loadingFallback={<TodoDetail.Loading />}
      renderError={(onRetry) => <TodoDetail.Error onRetry={onRetry} />}
    >
      <TodoDetail />
    </QueryBoundary>
  );
}
