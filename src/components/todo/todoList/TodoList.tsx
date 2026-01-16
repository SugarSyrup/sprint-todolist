import Image from "next/image";

import { useTodoListQuery } from "@/src/features/todo/hooks/useTodoListQuery";

import { Loading } from "./Loading";
import { Error } from "./Error";
import { TodoListItem } from "./TodoListItem";
import { Empty } from "./Empty";

export function TodoList() {
  const {
    data: { todo: todoStateList, done: doneStateList },
  } = useTodoListQuery();

  const isTodoStateListEmpty = todoStateList.length === 0;
  const isDoneStateListEmpty = doneStateList.length === 0;

  return (
    <div className="w-full flex flex-col gap-12 justify-start items-center xl:flex-row xl:gap-6 xl:justify-center xl:items-start">
      <ul className="w-full flex flex-col justify-start items-start gap-4">
        <Image
          src="/icons/todolist-tag-todo.svg"
          alt="todolist-tag-todo"
          width="98"
          height="36"
        />

        {isTodoStateListEmpty && (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <Empty.TodoList />
          </div>
        )}

        {todoStateList.map((todo) => (
          <TodoListItem type="todo" key={todo.id} id={todo.id}>
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

        {isDoneStateListEmpty && (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <Empty.DoneList />
          </div>
        )}

        {doneStateList.map((todo) => (
          <TodoListItem type="done" key={todo.id} id={todo.id}>
            {todo.name}
          </TodoListItem>
        ))}
      </ul>
    </div>
  );
}

TodoList.Loading = Loading;
TodoList.Error = Error;
