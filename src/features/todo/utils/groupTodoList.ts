import { Todo, TodoType } from "../model/todo.model";

export function groupTodoList(data: Todo[]) {
  const groupMap: Record<TodoType, Todo[]> = {
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
