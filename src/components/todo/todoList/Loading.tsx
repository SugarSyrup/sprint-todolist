import Image from "next/image";

import { Skeleton } from "@/src/components/common/Skeleton";

export function Loading() {
  return (
    <div className="w-full flex flex-col gap-12 justify-start items-center 2xl:flex-row 2xl:gap-6 2xl:justify-center 2xl:items-start">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        <Image
          src="/icons/todolist-tag-todo.svg"
          alt="todolist-tag-todo"
          width="98"
          height="36"
        />
        <Skeleton width="full" height={50} circle={false} />
        <Skeleton width="full" height={50} circle={false} />
        <Skeleton width="full" height={50} circle={false} />
        <Skeleton width="full" height={50} circle={false} />
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-4">
        <Image
          src="/icons/todolist-tag-done.svg"
          alt="todolist-tag-todo"
          width="98"
          height="36"
        />
        <Skeleton width="full" height={50} circle={false} />
        <Skeleton width="full" height={50} circle={false} />
        <Skeleton width="full" height={50} circle={false} />
        <Skeleton width="full" height={50} circle={false} />
      </div>
    </div>
  );
}
