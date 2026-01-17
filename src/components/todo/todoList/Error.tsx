import { Button } from "@/src/components/common/Button";

interface Props {
  onRetry: () => void;
}

export function Error({ onRetry }: Props) {
  return (
    <div className="w-full flex flex-col gap-5 justify-start items-start ">
      <span className="font-extrabold text-rose-500 text-xl">
        데이터를 가져오는 중 에러가 발생했습니다.
        <br /> 다시 시도해 주세요
      </span>
      <Button color="slate" onClick={onRetry}>
        다시 시도하기
      </Button>
    </div>
  );
}
