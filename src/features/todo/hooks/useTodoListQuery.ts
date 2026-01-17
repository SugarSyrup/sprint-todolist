import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodoList } from "../api/todo.api";
import { groupTodoList } from "../utils/groupTodoList";

export const todoListQueryKey = ["todolist"];

export function useTodoListQuery() {
  return useSuspenseQuery({
    queryKey: todoListQueryKey,
    queryFn: async () => {
      const data = await getTodoList();

      const groupedTodoList = groupTodoList(data);

      return groupedTodoList;
    },
    retry: 2,

    // Todo 목록 데이터 캐시 유지 시간 ( 30분 ) ( 예민하게 최신화 될 필요 없는 도메인 성격의 데이터 )
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
