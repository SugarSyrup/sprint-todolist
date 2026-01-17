import Image from "next/image";
import { useState, useMemo } from "react";
import isEqual from "lodash.isequal";

import { useTodoDetailQuery } from "@/src/features/todo/hooks/useTodoDetailQuery";
import { useTodoId } from "@/src/features/todo/hooks/useTodoId";
import { Button } from "@/src/components/common/Button";
import { TodoDetail as TodoDetailType } from "@/src/features/todo/model/todo.model";

import { Loading } from "./Loading";
import { Error } from "./Error";
import { Name } from "./Name";

export function TodoDetail() {
  const id = useTodoId();
  const { data: todoDetailSnapshot } = useTodoDetailQuery(id);

  const [form, setForm] = useState<TodoDetailType>(todoDetailSnapshot);

  const isDirty = useMemo(() => {
    if (form === null) return false;
    return !isEqual(todoDetailSnapshot, form);
  }, [form]);

  return (
    <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <Name
          {...todoDetailSnapshot}
          setName={(name) => setForm((prev) => ({ ...prev, name: name }))}
        />
      </div>

      <div className="w-full h-[311px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex justify-center items-center"></div>

      <div className="bg-[url('/imgs/memo.png')] h-[311px] bg-cover relative flex flex-col items-center justify-center py-[24px] px-[12px] rounded-3xl">
        <span className="text-amber-800 text-center font-extrabold text-[16px] absolute top-6">
          Memo
        </span>
        <textarea
          defaultValue={todoDetailSnapshot.memo}
          className="outline-0 resize-none w-full h-[200px] text-center overflow-hidden pt-[32px]"
        />
      </div>

      <div className="lg:col-span-2 w-full flex justify-center items-center sm:m-auto lg:justify-end">
        <div className="w-full h-inherit flex justify-center items-center gap-[7px] sm:max-w-[352px]">
          <Button
            color={isDirty ? "lime" : "slate"}
            disabled={!isDirty}
            onClick={() => {}}
            className="w-full"
            full={true}
            leftIcon={
              <Image
                src="/icons/check-slate.svg"
                alt="check-icon"
                width={16}
                height={16}
              />
            }
          >
            수정 완료
          </Button>

          <Button
            color="rose"
            className="w-full"
            full={true}
            leftIcon={
              <Image
                src="/icons/x-white.svg"
                alt="check-icon"
                width={16}
                height={16}
              />
            }
          >
            삭제 하기
          </Button>
        </div>
      </div>
    </div>
  );
}

TodoDetail.Loading = Loading;
TodoDetail.Error = Error;
