import { Skeleton } from "@/src/components/common/Skeleton";

export function Loading() {
  return (
    <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <Skeleton width="full" height={64} circle={false} />
      </div>

      <div className="">
        <Skeleton width="full" height={312} circle={false} />
      </div>
      <div className="">
        <Skeleton width="full" height={312} circle={false} />
      </div>
    </div>
  );
}
