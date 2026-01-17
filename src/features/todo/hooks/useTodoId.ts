import { useParams } from "next/navigation";

// Todo ID 조회 함수
export function useTodoId() {
  const { itemId } = useParams();

  // itemId가 숫자가 아닐 때 에러 발생
  if (Number.isNaN(Number(itemId))) {
    throw new Error("itemId is not number");
  }

  return Number(itemId);
}
