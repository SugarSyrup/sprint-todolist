import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTodo } from "../api/todo.api";
import { Todo, TodoDetail, TodoType } from "../model/todo.model";
import { changeTodoState } from "../utils/changeTodoState";

import { todoListQueryKey } from "./useTodoListQuery";
import { todoDetailQueryKey } from "./useTodoDetailQuery";

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
      await queryClient.cancelQueries({ queryKey: todoDetailQueryKey(id) });

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

      const prevTodoDetailSnapshot = queryClient.getQueryData(
        todoDetailQueryKey(id)
      );

      queryClient.setQueryData(
        todoDetailQueryKey(id),
        (prevTodoDetail: TodoDetail | undefined) => {
          if (!prevTodoDetail) {
            return prevTodoDetail;
          }
          return { ...prevTodoDetail, isCompleted };
        }
      );

      return { prevTodoListRecordSnapshot, prevTodoDetailSnapshot, id };
    },
    onSettled: (_, __, { id }) => {
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
      queryClient.invalidateQueries({ queryKey: todoDetailQueryKey(id) });
    },
    onError: (_, __, context) => {
      if (context === undefined) return;

      queryClient.setQueryData(
        todoListQueryKey,
        context.prevTodoListRecordSnapshot
      );

      queryClient.setQueryData(
        todoDetailQueryKey(context.id),
        context.prevTodoDetailSnapshot
      );

      window.alert("상태 변경 처리를 실패했습니다. 다시 시도해주세요");
    },
  });
}
