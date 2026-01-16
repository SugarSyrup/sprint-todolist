import { TodoListSection } from "@/src/components/todo/TodoListSection";

export default function Home() {
  return (
    <div className="w-full px-[24px] lg:px-[360px] pt-[24px] flex flex-col justify-start items-center">
      <TodoListSection />
    </div>
  );
}
