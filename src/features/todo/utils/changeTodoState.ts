import { Todo } from "../model/todo.model";

export function changeTodoState(todoList: Todo[], id: Todo["id"]) {
  return todoList.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    }
    return todo;
  });
}
