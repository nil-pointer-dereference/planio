import type { HTMLAttributes, PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren & HTMLAttributes<HTMLDivElement>;

export default function Container({
  children,
  className,
  ...rest
}: ContainerProps) {
  return (
    <div className={"w-full h-full flex justify-center items-start pl-20 pr-20" + className} {...rest}>
      {children}
    </div>
  );
}
