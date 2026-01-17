"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import classNames from "classnames";

import { TodoDetail } from "@/src/features/todo/model/todo.model";
import { RoundButton } from "@/src/components/common/RoundButton";
import { uploadImage } from "@/src/features/todo/api/image.api";

interface Props {
  imageUrl: TodoDetail["imageUrl"];
  setImageUrl: (imageUrl: TodoDetail["imageUrl"]) => void;
}

export function ImageInput({ imageUrl, setImageUrl }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이미지 업로드 중일 때 상태 변경 > 로딩 UI
    setIsUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 파일만 업로드 가능
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      setIsUploading(false);
      return;
    }

    // 파일 크기는 5MB 이하
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      setIsUploading(false);
      return;
    }

    // 파일 이름은 영어 만
    const fileName = file.name;
    const englishOnlyRegex = /^[a-zA-Z.]+$/;
    if (!englishOnlyRegex.test(fileName)) {
      alert("파일 이름은 영어 만 사용 가능합니다.");
      setIsUploading(false);
      return;
    }

    uploadImage(file)
      .then(({ url }) => {
        setImageUrl(url);
      })
      .finally(() => {
        setIsUploading(false);
      })
      .catch((error) => {
        alert("이미지 업로드에 실패했습니다.");
        console.error(error);
      });
  };

  // 이미지 업로드 버튼 클릭 시 파일 입력 요소 클릭
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // 이미지 업로딩 중일 때 로딩 UI
  if (isUploading) {
    return (
      <div className="w-full h-[311px] rounded-3xl border-2 border-slate-300 bg-slate-50 flex justify-center items-center relative">
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src="/icons/spinner.svg"
            alt="loading-icon"
            width={64}
            height={64}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "w-full h-[311px] rounded-3xl border-2 border-slate-300 bg-slate-50 flex justify-center items-center relative",
        imageUrl ? "bg-transparent border-none" : "border-dashed"
      )}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 이미지 있을 때/없을 때 UI */}
      {imageUrl ? (
        <div className="w-full h-full relative rounded-3xl overflow-hidden">
          <Image
            src={imageUrl}
            alt="todo-image"
            fill
            className="object-contain"
          />
          <RoundButton
            onClick={handleClick}
            className="absolute bottom-4 right-2"
            size="default"
            color="black"
          >
            <Image
              src="/icons/pencil.svg"
              alt="edit-image-icon"
              width={24}
              height={24}
            />
          </RoundButton>
        </div>
      ) : (
        <button
          onClick={handleClick}
          type="button"
          className="w-full h-full flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition-colors rounded-3xl"
        >
          <Image src="/icons/img.svg" alt="image-icon" width={64} height={64} />
          <RoundButton
            onClick={handleClick}
            className="absolute bottom-4 right-2"
            size="default"
            color="slate"
          >
            <Image
              src="/icons/plus-slate-500.svg"
              alt="upload-image-icon"
              width={24}
              height={24}
            />
          </RoundButton>
        </button>
      )}
    </div>
  );
}
