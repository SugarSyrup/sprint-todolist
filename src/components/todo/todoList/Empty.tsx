import Image from "next/image";

function TodoListEmpty() {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Image
        src="/imgs/todolist-empty.png"
        width={240}
        height={240}
        alt="todolist-empty-img"
      />
      <span className="text-center text-[16px] font-bold text-slate-400">
        할 일이 없어요.
        <br />
        TODO를 새롭게 추가해주세요!
      </span>
    </div>
  );
}

function DoneListEmpty() {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <Image
        src="/imgs/donelist-empty.png"
        width={240}
        height={240}
        alt="donelist-empty-img"
      />
      <span className="text-center text-[16px] font-bold text-slate-400">
        아직 다 한 일이 없어요.
        <br />
        해야 할 일을 체크해보세요!
      </span>
    </div>
  );
}

export const Empty = { TodoList: TodoListEmpty, DoneList: DoneListEmpty };
