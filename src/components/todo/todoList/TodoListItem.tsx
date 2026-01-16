import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function TodoListItem({ children }: Props) {
  return <li>{children}</li>;
}
