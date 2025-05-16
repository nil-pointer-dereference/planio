import type { HTMLAttributes } from "react";

export default function H3(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      {...props}
    ></h3>
  );
}
