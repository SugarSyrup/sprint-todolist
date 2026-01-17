// 공통 버튼 컴포넌트

import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
  color: "rose" | "violet" | "lime" | "slate";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  full?: boolean;

  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  children: string | ReactNode;
}>;

const buttonColorMap: Record<Props["color"], string> = {
  slate: "bg-slate-200 text-slate-900",
  rose: "bg-rose-500 text-white",
  violet: "bg-violet-600 text-white",
  lime: "bg-lime-300 text-slate-900",
};

export function Button({
  color,
  leftIcon,
  rightIcon,
  full = false,
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className={classNames(full && "w-full", "relative min-w-fit")}>
      <div className="absolute -z-10 w-full h-full top-1 left-[2px] bg-slate-900 rounded-3xl" />
      <button
        className={classNames(
          className,
          buttonColorMap[color],
          `relative min-w-[56px] h-[56px] px-[18px] py-[18px] flex gap-1 justify-center items-center border-2 border-slate-900 rounded-3xl font-bold cursor-pointer `
        )}
        {...rest}
      >
        {leftIcon}
        <span>{children}</span>
        {rightIcon}
      </button>
    </div>
  );
}
