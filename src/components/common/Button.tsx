import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
  color: "rose" | "violet" | "lime" | "slate";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  children: string;
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
  children,
  className,
  ...rest
}: Props) {
  return (
    <div className="relative w-fit">
      <div className="absolute -z-10 w-full h-full top-1 left-[2px] bg-slate-900 rounded-3xl" />
      <button
        className={classNames(
          buttonColorMap[color],
          `relative min-w-[56px] w-max h-[56px] px-[18px] py-[18px] flex gap-1 justify-center items-center border-2 border-slate-900 rounded-3xl font-bold cursor-pointer `,
          className
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
