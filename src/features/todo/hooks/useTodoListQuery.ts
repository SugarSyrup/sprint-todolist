import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodoList } from "../api/todo.api";
import { groupTodoList } from "../utils/groupTodoList";

const todoListQueryKey = ["todolist"];

export function useTodoListQuery() {
  return useSuspenseQuery({
    queryKey: todoListQueryKey,
    queryFn: async () => {
      const data = await getTodoList();

      const groupedTodoList = groupTodoList(data);

      return groupedTodoList;
    },
    retry: 2,

    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
