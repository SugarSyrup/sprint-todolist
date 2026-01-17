import { TodoDetailSection } from "@/src/components/todo/TodoDetailSection";

export default function Home() {
  return (
    <div className="w-full px-[24px] lg:px-[360px] pt-[24px] flex flex-col gap-10 justify-start items-center">
      <TodoDetailSection />
    </div>
  );
}
