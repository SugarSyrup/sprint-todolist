"use client";

import Image from "next/image";
import { useState } from "react";

import { useCreateTodoMutation } from "@/src/features/todo/hooks/useCreateTodoMutation";
import { Button } from "@/src/components/common/Button";

export function TodoForm() {
  const [value, setValue] = useState<string>("");
  const { mutate: createTodo } = useCreateTodoMutation();

  function onSubmit() {
    createTodo(value, {
      onSuccess: () => {
        setValue("");
      },
    });
  }

  return (
    <form
      className="w-full flex justify-center items-center gap-1 shrink-0"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="relative w-full h-[56px]">
        <div className="absolute -z-10 w-full h-full top-1 left-[2px] bg-slate-900 rounded-3xl" />
        <input
          className="w-full h-full border-2 border-slate-900 rounded-3xl bg-slate-100 outline-none px-6 placeholder-slate-500 text-[16px] text-slate-900"
          placeholder="할 일을 입력해주세요"
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          type="text"
          name="value"
        />
      </div>

      <Button
        color="slate"
        leftIcon={
          <Image
            src="/icons/plus-slate-900.svg"
            alt="todoform-submit-btn-icon"
            width={16}
            height={16}
          />
        }
      >
        추가하기
      </Button>
    </form>
  );
}
