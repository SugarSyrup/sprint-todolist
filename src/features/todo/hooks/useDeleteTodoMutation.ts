import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../api/todo.api";
import { Todo, TodoType } from "../model/todo.model";
import { todoListQueryKey } from "./useTodoListQuery";
import { todoDetailQueryKey } from "./useTodoDetailQuery";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Todo["id"]) => {
      return deleteTodo(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoListQueryKey });
      await queryClient.cancelQueries({ queryKey: todoDetailQueryKey(id) });

      const prevTodoListRecordSnapshot =
        queryClient.getQueryData(todoListQueryKey);

      queryClient.setQueryData(
        todoListQueryKey,
        (prevTodoRecord: Record<TodoType, Todo[]> | undefined) => {
          if (!prevTodoRecord) {
            return { todo: [], done: [] };
          }

          return {
            todo: prevTodoRecord.todo.filter((todo) => todo.id !== id),
            done: prevTodoRecord.done.filter((todo) => todo.id !== id),
          };
        }
      );

      const prevTodoDetailSnapshot = queryClient.getQueryData(
        todoDetailQueryKey(id)
      );
      queryClient.removeQueries({ queryKey: todoDetailQueryKey(id) });

      return { prevTodoListRecordSnapshot, prevTodoDetailSnapshot, id };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
    },
    onError: (_, __, context) => {
      if (context === undefined) return;

      if (context.prevTodoListRecordSnapshot) {
        queryClient.setQueryData(
          todoListQueryKey,
          context.prevTodoListRecordSnapshot
        );
      }

      if (context.prevTodoDetailSnapshot) {
        queryClient.setQueryData(
          todoDetailQueryKey(context.id),
          context.prevTodoDetailSnapshot
        );
      }

      window.alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
