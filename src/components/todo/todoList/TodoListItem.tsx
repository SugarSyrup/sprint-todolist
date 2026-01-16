import { ReactNode } from "react";
import Image from "next/image";
import classNames from "classnames";

import { TodoType } from "@/src/features/todo/model/todo.model";

interface Props {
  type: TodoType;
  children: ReactNode;
}

const colorMap = {
  todo: "bg-white",
  done: "bg-violet-100",
};

export function TodoListItem({ type, children }: Props) {
  return (
    <li
      className={classNames(
        "w-full h-[50px] pl-3 flex justify-start items-center gap-4 border-2 border-slate-900 rounded-[27px]",
        type === "todo" ? colorMap["todo"] : colorMap["done"]
      )}
    >
      <Image
        src={type === "todo" ? "/icons/unchecked.svg" : "/icons/checked.svg"}
        alt="todolist-item-check-icon"
        width="32"
        height="32"
      />

      <span
        className={classNames(
          "font-normal text-[16px]",
          type === "done" && "line-through"
        )}
      >
        {children}
      </span>
    </li>
  );
}
