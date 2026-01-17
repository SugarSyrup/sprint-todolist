import Image from "next/image";

import { useTodoDetailQuery } from "@/src/features/todo/hooks/useTodoDetailQuery";
import { useTodoId } from "@/src/features/todo/hooks/useTodoId";
import { Button } from "@/src/components/common/Button";
import { useChangeTodoStateMutation } from "@/src/features/todo/hooks/useChangeTodoStateMutation";

import { Loading } from "./Loading";
import { Error } from "./Error";

export function TodoDetail() {
  const id = useTodoId();
  const {
    data: { isCompleted, name, memo },
  } = useTodoDetailQuery(id);

  const { mutate: changeTodoStateMutate } = useChangeTodoStateMutation();

  return (
    <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2 w-full h-[64px] rounded-3xl border-2 border-slate-900 bg-white flex justify-center items-center gap-4">
        <Image
          src={isCompleted ? "/icons/checked.svg" : "/icons/unchecked.svg"}
          alt="todolist-item-check-icon"
          width="32"
          height="32"
          onClick={() => {
            changeTodoStateMutate({ id, isCompleted: !isCompleted });
          }}
        />

        <input
          defaultValue={name}
          className="underline font-bold text-xl field-sizing-content outline-0"
          type="text"
          name="name"
        />
      </div>

      <div className="w-full h-[311px] rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 flex justify-center items-center"></div>

      <div className="bg-[url('/imgs/memo.png')] h-[311px] bg-cover relative flex flex-col items-center justify-center py-[24px] px-[12px] rounded-3xl">
        <span className="text-amber-800 text-center font-extrabold text-[16px] absolute top-6">
          Memo
        </span>
        <textarea
          defaultValue={memo}
          className="outline-0 resize-none w-full h-[200px] text-center overflow-hidden pt-[32px]"
        />
      </div>

      <div className="lg:col-span-2 w-full h-inherit flex justify-center items-center gap-[7px]">
        <Button
          color="slate"
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
  );
}

TodoDetail.Loading = Loading;
TodoDetail.Error = Error;
