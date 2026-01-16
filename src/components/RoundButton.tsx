import { PropsWithChildren, ReactNode } from "react";
import classNames from "classnames";

type Props = PropsWithChildren<{
  size: "default";
  color: "black" | "slate";

  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  children: ReactNode;
}>;

const buttonColorMap: Record<Props["color"], string> = {
  slate: "bg-slate-200",
  black: "bg-slate-900/50 border-2 border-slate-900",
};

const buttonSizeMap: Record<Props["size"], string> = {
  default: "w-16 h-16",
};

export function RoundButton({
  color,
  size = "default",
  children,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={classNames(
        buttonColorMap[color],
        buttonSizeMap[size],
        "rounded-[100%] flex justify-center items-center",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
