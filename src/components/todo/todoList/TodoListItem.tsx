import { ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";

import { Todo, TodoType } from "@/src/features/todo/model/todo.model";
import { useChangeTodoStateMutation } from "@/src/features/todo/hooks/useChangeTodoStateMutation";
import Link from "next/link";

interface Props {
  id: Todo["id"];
  type: TodoType;
  children: ReactNode;
}

const colorMap = {
  todo: "bg-white",
  done: "bg-violet-100",
};

export function TodoListItem({ id, type, children }: Props) {
  const isCompleted = type === "done";

  // Todo 상태 변경 함수
  const { mutate: changeTodoStateMutate } = useChangeTodoStateMutation();

  return (
    <Link href={`/items/${id}`} className="w-full">
      {/* Todo 상세 페이지로 이동하는 Link */}
      <li
        className={classNames(
          "w-full h-[50px] pl-3 flex justify-start items-center gap-4 border-2 border-slate-900 rounded-[27px] pointer",
          type === "todo" ? colorMap["todo"] : colorMap["done"]
        )}
      >
        {/* Todo 상태 변경 아이콘 */}
        <Image
          src={type === "todo" ? "/icons/unchecked.svg" : "/icons/checked.svg"}
          alt="todolist-item-check-icon"
          width="32"
          height="32"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            changeTodoStateMutate({ id, isCompleted: !isCompleted });
          }}
        />

        {/* Todo 이름 */}
        <span
          className={classNames(
            "font-normal text-[16px]",
            type === "done" && "line-through"
          )}
        >
          {children}
        </span>
      </li>
    </Link>
  );
}
