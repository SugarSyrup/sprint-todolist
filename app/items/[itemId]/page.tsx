import { TodoDetailSection } from "@/src/components/todo/TodoDetailSection";

export default function Home() {
  return (
    <div className="w-full h-[calc(100dvh-60px)]  bg-gray-50 lg:px-[360px]">
      <div className="w-full max-w-[1200px] h-[calc(100dvh-60px)] bg-white m-auto px-[16px] sm:px-[24px] pt-[16px] sm:pt-[24px]">
        <TodoDetailSection />
      </div>
    </div>
  );
}
