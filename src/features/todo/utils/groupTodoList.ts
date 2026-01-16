import { Todo } from "../model/todo.model";

export function groupTodoList(data: Todo[]) {
  const groupMap: Record<"todo" | "done", Todo[]> = {
    todo: [],
    done: [],
  };

  data.forEach((todo) => {
    if (todo.isCompleted) {
      groupMap.done.push(todo);
    } else {
      groupMap.todo.push(todo);
    }
  });

  return groupMap;
}
