import { useSuspenseQuery } from "@tanstack/react-query";
import { getTodoDetail } from "@/src/features/todo/api/todo.api";
import { Todo } from "@/src/features/todo/model/todo.model";

export function todoDetailQueryKey(id: Todo["id"]) {
  return ["todoDetail", id];
}

export function useTodoDetailQuery(id: Todo["id"]) {
  return useSuspenseQuery({
    queryKey: todoDetailQueryKey(id),
    queryFn: async () => {
      const data = await getTodoDetail(id);
      return data;
    },
    retry: 2,
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
  });
}
