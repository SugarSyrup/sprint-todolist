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
      // Todo 삭제 중 데이터 캐시 무효화
      await queryClient.cancelQueries({ queryKey: todoListQueryKey });
      await queryClient.cancelQueries({ queryKey: todoDetailQueryKey(id) });

      // 이전 Todo 목록 데이터 캐시 저장
      const prevTodoListRecordSnapshot =
        queryClient.getQueryData(todoListQueryKey);

      // 이전 Todo 목록 데이터 캐시 업데이트
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

      // 이전 Todo 상세 페이지 데이터 캐시 백업
      const prevTodoDetailSnapshot = queryClient.getQueryData(
        todoDetailQueryKey(id)
      );

      // 이전 Todo 상세 페이지 데이터 캐시 삭제
      queryClient.removeQueries({ queryKey: todoDetailQueryKey(id) });

      return { prevTodoListRecordSnapshot, prevTodoDetailSnapshot, id };
    },
    onSettled: () => {
      // Todo 삭제 중 데이터 캐시 무효화 후 Todo 목록 데이터 캐시 업데이트
      queryClient.invalidateQueries({ queryKey: todoListQueryKey });
    },
    // Todo 삭제 중 에러 발생 시 이전 Todo 목록 데이터 캐시 복원
    onError: (_, __, context) => {
      if (context === undefined) return;

      // 이전 Todo 목록 데이터 캐시 복원
      if (context.prevTodoListRecordSnapshot) {
        queryClient.setQueryData(
          todoListQueryKey,
          context.prevTodoListRecordSnapshot
        );
      }

      // 이전 Todo 상세 페이지 데이터 캐시 복원
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
