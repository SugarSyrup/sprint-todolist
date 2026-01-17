import classNames from "classnames";

export function Skeleton({
  width,
  height,
  circle,
}: {
  width: number | "full";
  height: number;
  circle?: boolean;
}) {
  return (
    <div
      className={classNames(
        width === "full" ? "w-full" : "",
        "bg-slate-300",
        circle ? "rounded-full" : "rounded-lg"
      )}
      style={{
        ...(width !== "full" && { width: `${width}px` }),
        height: `${height}px`,
      }}
    />
  );
}
