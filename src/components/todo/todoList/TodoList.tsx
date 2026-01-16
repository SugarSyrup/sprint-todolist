import Image from "next/image";

import { useTodoListQuery } from "@/src/features/todo/hooks/useTodoListQuery";

import { Loading } from "./Loading";
import { Error } from "./Error";
import { TodoListItem } from "./TodoListItem";

export function TodoList() {
  const {
    data: { todo: todoStateList, done: doneStateList },
  } = useTodoListQuery();

  return (
    <div className="w-full flex flex-col gap-12 justify-start items-center xl:flex-row xl:gap-6 xl:justify-center xl:items-start">
      <ul className="w-full flex flex-col justify-start items-start gap-4">
        <Image
          src="/icons/todolist-tag-todo.svg"
          alt="todolist-tag-todo"
          width="98"
          height="36"
        />
        {todoStateList.map((todo) => (
          <TodoListItem type="todo" key={todo.id}>
            {todo.name}
          </TodoListItem>
        ))}
      </ul>

      <ul className="w-full flex flex-col justify-start items-start gap-4">
        <Image
          src="/icons/todolist-tag-done.svg"
          alt="todolist-tag-todo"
          width="98"
          height="36"
        />
        {doneStateList.map((todo) => (
          <TodoListItem type="done" key={todo.id}>
            {todo.name}
          </TodoListItem>
        ))}
      </ul>
    </div>
  );
}

TodoList.Loading = Loading;
TodoList.Error = Error;
