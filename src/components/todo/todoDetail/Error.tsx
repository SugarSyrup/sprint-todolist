import { useRouter } from "next/navigation";

import { Button } from "@/src/components/common/Button";

interface Props {
  onRetry: () => void;
}

export function Error({ onRetry }: Props) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-5 justify-start items-start ">
      <span className="font-extrabold text-rose-500 text-xl">
        데이터를 가져오는 중 에러가 발생했습니다.
        <br /> 다시 시도하거나 이전 페이지로 돌아가 다시 시도해주세요
      </span>
      <div className="flex justify-start items-center gap-4">
        <Button
          color="rose"
          onClick={() => {
            router.back();
          }}
        >
          뒤로 가기
        </Button>
        <Button color="slate" onClick={onRetry}>
          다시 시도하기
        </Button>
      </div>
    </div>
  );
}
