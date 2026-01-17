import Image from "next/image";
import classNames from "classnames";

import { TodoDetail } from "@/src/features/todo/model/todo.model";

interface Props {
  id: TodoDetail["id"];
  name: TodoDetail["name"];
  isCompleted: TodoDetail["isCompleted"];
  setName: (name: TodoDetail["name"]) => void;
  setIsCompleted: (isCompleted: TodoDetail["isCompleted"]) => void;
}

export function NameNState({
  isCompleted,
  name,
  setName,
  setIsCompleted,
}: Props) {
  return (
    <div
      className={classNames(
        "w-full h-[64px] rounded-3xl border-2 border-slate-900 flex justify-center items-center gap-4",
        isCompleted ? "bg-violet-200" : "bg-white"
      )}
    >
      <Image
        src={isCompleted ? "/icons/checked.svg" : "/icons/unchecked.svg"}
        alt="todo-check-icon"
        width="32"
        height="32"
        onClick={() => {
          setIsCompleted(!isCompleted);
        }}
      />

      <input
        defaultValue={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
        className="underline font-bold text-xl field-sizing-content outline-0"
        type="text"
        name="name"
      />
    </div>
  );
}
