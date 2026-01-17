import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todo.api";
import { Todo, TodoDetail, updateTodoRequest } from "../model/todo.model";
import { todoListQueryKey } from "./useTodoListQuery";
import { todoDetailQueryKey } from "./useTodoDetailQuery";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      ...rest
    }: {
      id: Todo["id"];
    } & updateTodoRequest) => {
      return updateTodo({ id, ...rest });
    },
    onMutate: async ({ id, ...rest }) => {
      await queryClient.cancelQueries({ queryKey: todoListQueryKey });
      await queryClient.cancelQueries({ queryKey: todoDetailQueryKey(id) });

      const prevTodoListRecordSnapshot =
        queryClient.getQueryData(todoListQueryKey);
      const prevTodoDetailSnapshot = queryClient.getQueryData(
        todoDetailQueryKey(id)
      );
      queryClient.setQueryData(
        todoDetailQueryKey(id),
        (prevTodoDetail: TodoDetail | undefined) => {
          if (!prevTodoDetail) return prevTodoDetail;
          return { ...prevTodoDetail, ...rest };
        }
      );

      return { prevTodoListRecordSnapshot, prevTodoDetailSnapshot };
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
      queryClient.invalidateQueries({
        queryKey: todoDetailQueryKey(variables.id),
      });
    },
    onError: (_, variables, context) => {
      if (context === undefined) return;

      if (context.prevTodoListRecordSnapshot) {
        queryClient.setQueryData(
          todoListQueryKey,
          context.prevTodoListRecordSnapshot
        );
      }

      queryClient.setQueryData(
        todoDetailQueryKey(variables.id),
        context.prevTodoDetailSnapshot
      );

      window.alert("수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
}
