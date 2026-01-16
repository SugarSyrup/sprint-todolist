import { http } from "@/src/utils/http";
import { Todo, TodoDetail, updateTodoRequest } from "../model/todo.model";

export function getTodoList() {
  return http.get<Todo[]>("items");
}

export function getTodoDetail(id: Todo["id"]) {
  return http.get<TodoDetail>(`items/${id}`);
}

export function createTodo(name: string) {
  return http.post<{ name: string }, TodoDetail>("items", { name });
}

export function updateTodo({
  id,
  ...rest
}: { id: Todo["id"] } & updateTodoRequest) {
  return http.patch<updateTodoRequest, TodoDetail>(`items/${id}`, rest);
}

export function deleteTodo(id: Todo["id"]) {
  return http.delete<{ message: string }>(`items/${id}`);
}
