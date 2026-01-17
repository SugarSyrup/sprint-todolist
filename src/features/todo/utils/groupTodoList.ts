import { Todo, TodoType } from "../model/todo.model";

// Todo 목록 그룹화 함수
export function groupTodoList(data: Todo[]) {
  // Todo 목록 그룹화 맵 생성
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
