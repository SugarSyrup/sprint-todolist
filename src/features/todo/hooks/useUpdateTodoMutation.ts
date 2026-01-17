import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todo.api";
import { Todo, TodoDetail, updateTodoRequest } from "../model/todo.model";
import { todoListQueryKey } from "./useTodoListQuery";
import { todoDetailQueryKey } from "./useTodoDetailQuery";

// Todo 수정 함수
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
      // Todo 수정 중 데이터 캐시 무효화
      await queryClient.cancelQueries({ queryKey: todoListQueryKey });
      await queryClient.cancelQueries({ queryKey: todoDetailQueryKey(id) });

      // 이전 Todo 목록 데이터 캐시 백업
      const prevTodoListRecordSnapshot =
        queryClient.getQueryData(todoListQueryKey);

      // 이전 Todo 상세 페이지 데이터 캐시 백업
      const prevTodoDetailSnapshot = queryClient.getQueryData(
        todoDetailQueryKey(id)
      );

      // 이전 Todo 상세 페이지 데이터 캐시 업데이트
      queryClient.setQueryData(
        todoDetailQueryKey(id),
        (prevTodoDetail: TodoDetail | undefined) => {
          if (!prevTodoDetail) return prevTodoDetail;
          return { ...prevTodoDetail, ...rest };
        }
      );

      // 이전 Todo 목록 데이터 캐시 반환
      return { prevTodoListRecordSnapshot, prevTodoDetailSnapshot };
    },
    onSettled: (_, __, variables) => {
      // Todo 수정 중 데이터 캐시 무효화 후 Todo 목록 데이터 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });

      // Todo 수정 중 데이터 캐시 무효화 후 Todo 상세 페이지 데이터 캐시 업데이트
      queryClient.invalidateQueries({
        queryKey: todoDetailQueryKey(variables.id),
      });
    },
    onError: (_, variables, context) => {
      if (context === undefined) return;

      // 이전 Todo 목록 데이터 캐시 복원
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
