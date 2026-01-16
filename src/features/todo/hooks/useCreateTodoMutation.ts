import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "../api/todo.api";
import { todoListQueryKey } from "./useTodoListQuery";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
    },
  });
}
