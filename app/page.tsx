// Todo List Page (Home Page)

import { TodoForm } from "@/src/components/todo/TodoForm";
import { TodoListSection } from "@/src/components/todo/TodoListSection";

export default function Home() {
  return (
    <div className="w-full px-[16px] sm:px-[24px] lg:px-[360px] pt-[24px] flex flex-col gap-10 justify-start items-center">
      <TodoForm />
      <TodoListSection />
    </div>
  );
}
