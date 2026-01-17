import { useParams } from "next/navigation";

export function useTodoId() {
  const { itemId } = useParams();

  if (Number.isNaN(Number(itemId))) {
    throw new Error("itemId is not number");
  }

  return Number(itemId);
}
