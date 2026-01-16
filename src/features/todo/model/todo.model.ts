export interface Todo {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface TodoDetail extends Todo {
  imageUrl: string;
  memo: string;
  tenantId: string;
}

export interface updateTodoRequest {
  name: TodoDetail["name"];
  memo: TodoDetail["memo"];
  imageUrl: TodoDetail["imageUrl"];
  isCompleted: TodoDetail["isCompleted"];
}
