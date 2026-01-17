import { TodoDetail } from "@/src/features/todo/model/todo.model";

interface Props {
  memo: TodoDetail["memo"];
  setMemo: (memo: TodoDetail["memo"]) => void;
}

export function Memo({ memo, setMemo }: Props) {
  return (
    <div className="bg-[url('/imgs/memo.png')] h-[311px] bg-cover relative flex flex-col items-center justify-center py-[24px] px-[12px] rounded-3xl">
      <span className="text-amber-800 text-center font-extrabold text-[16px] absolute top-6">
        Memo
      </span>
      <textarea
        defaultValue={memo}
        onChange={(e) => {
          setMemo(e.currentTarget.value);
        }}
        className="outline-0 resize-none w-full h-[200px] text-center overflow-hidden pt-[32px]"
      />
    </div>
  );
}
