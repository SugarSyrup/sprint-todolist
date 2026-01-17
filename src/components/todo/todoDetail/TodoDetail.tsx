import Image from "next/image";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import isEqual from "lodash.isequal";

import { useTodoDetailQuery } from "@/src/features/todo/hooks/useTodoDetailQuery";
import { useTodoId } from "@/src/features/todo/hooks/useTodoId";
import { useUpdateTodoMutation } from "@/src/features/todo/hooks/useUpdateTodoMutation";
import { useDeleteTodoMutation } from "@/src/features/todo/hooks/useDeleteTodoMutation";
import { Button } from "@/src/components/common/Button";
import { TodoDetail as TodoDetailType } from "@/src/features/todo/model/todo.model";

import { Loading } from "./Loading";
import { Error } from "./Error";
import { NameNState } from "./NameNState";
import { ImageInput } from "./ImageInput";
import { Memo } from "./Memo";

export function TodoDetail() {
  const id = useTodoId();
  const router = useRouter();

  const { data: todoDetailSnapshot } = useTodoDetailQuery(id);

  // Todo에 대한 사용자 입력 값 관리
  const [form, setForm] = useState<TodoDetailType>(todoDetailSnapshot);

  const { mutate: updateTodoMutate, isPending } = useUpdateTodoMutation();
  const { mutate: deleteTodoMutate, isPending: isDeleting } =
    useDeleteTodoMutation();

  // 사용자 입력으로 기존 값과 변경 되었는지 확인
  const isDirty = useMemo(() => {
    if (form === null) return false;
    return !isEqual(todoDetailSnapshot, form);
  }, [form, todoDetailSnapshot]);

  // Todo 수정 함수
  const handleUpdate = () => {
    if (!isDirty || !form) return;

    updateTodoMutate(
      {
        id: form.id,
        name: form.name,
        memo: form.memo ?? "",
        imageUrl: form.imageUrl ?? "",
        isCompleted: form.isCompleted,
      },
      {
        onSuccess: () => {
          // 수정 성공 시 이전 페이지로 이동
          router.back();
        },
      }
    );
  };

  const handleDelete = () => {
    deleteTodoMutate(id, {
      onSuccess: () => {
        router.replace("/");
      },
    });
  };

  return (
    <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <NameNState
          name={form.name}
          isCompleted={form.isCompleted}
          id={form.id}
          setName={(name) => setForm((prev) => ({ ...prev, name: name }))}
          setIsCompleted={(isCompleted) =>
            setForm((prev) => ({ ...prev, isCompleted: isCompleted }))
          }
        />
      </div>

      <ImageInput
        imageUrl={form.imageUrl}
        setImageUrl={(imageUrl) => setForm((prev) => ({ ...prev, imageUrl }))}
      />

      <Memo
        memo={form.memo}
        setMemo={(memo) => setForm((prev) => ({ ...prev, memo }))}
      />

      {/* 수정 완료/삭제 버튼 */}
      <div className="lg:col-span-2 w-full flex justify-center items-center sm:m-auto lg:justify-end">
        <div className="w-full h-inherit flex justify-center items-center gap-[7px] sm:max-w-[352px]">
          <Button
            color={isDirty ? "lime" : "slate"}
            disabled={!isDirty || isPending}
            onClick={handleUpdate}
            className="w-full"
            full={true}
            leftIcon={
              <Image
                src="/icons/check-slate.svg"
                alt="check-icon"
                width={16}
                height={16}
              />
            }
          >
            수정 완료
          </Button>

          <Button
            color="rose"
            className="w-full"
            full={true}
            disabled={isDeleting}
            onClick={handleDelete}
            leftIcon={
              <Image
                src="/icons/x-white.svg"
                alt="check-icon"
                width={16}
                height={16}
              />
            }
          >
            삭제 하기
          </Button>
        </div>
      </div>
    </div>
  );
}

TodoDetail.Loading = Loading;
TodoDetail.Error = Error;
