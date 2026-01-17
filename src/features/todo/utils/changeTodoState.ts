import { Todo } from "../model/todo.model";

// Todo 상태 변경 함수
export function changeTodoState(todoList: Todo[], id: Todo["id"]) {
  // Todo 상태 변경 후 Todo 목록 반환
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
