"use client";

import { QueryBoundary } from "../common/QueryBoudary";
import { TodoList } from "./todoList/TodoList";

export function TodoListSection() {
  return (
    <QueryBoundary
      loadingFallback={<TodoList.Loading />}
      renderError={(onRetry) => <TodoList.Error onRetry={onRetry} />}
    >
      <TodoList />
    </QueryBoundary>
  );
}
