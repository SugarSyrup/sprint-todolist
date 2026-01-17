import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTodo } from "../api/todo.api";
import { Todo, TodoType } from "../model/todo.model";
import { changeTodoState } from "../utils/changeTodoState";

import { todoListQueryKey } from "./useTodoListQuery";

export function useChangeTodoStateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isCompleted,
    }: {
      id: number;
      isCompleted: boolean;
    }) => {
      return updateTodo({ id, isCompleted });
    },
    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: todoListQueryKey });

      const prevTodoListRecordSnapshot =
        queryClient.getQueryData(todoListQueryKey);

      queryClient.setQueryData(
        todoListQueryKey,
        (prevTodoRecord: Record<TodoType, Todo[]> | undefined) => {
          if (!prevTodoRecord) {
            return { todo: [], done: [] };
          }

          if (isCompleted) {
            prevTodoRecord["todo"] = changeTodoState(
              prevTodoRecord["todo"],
              id
            );
          } else {
            prevTodoRecord["done"] = changeTodoState(
              prevTodoRecord["done"],
              id
            );
          }

          return prevTodoRecord;
        }
      );

      return { prevTodoListRecordSnapshot };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
    },
    onError: (_, __, context) => {
      if (context === undefined) return;

      queryClient.setQueryData(
        todoListQueryKey,
        context.prevTodoListRecordSnapshot
      );

      window.alert("상태 변경 처리를 실패했습니다. 다시 시도해주세요");
    },
  });
}
