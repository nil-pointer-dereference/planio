import type { HTMLAttributes } from "react";

export default function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
      {...props}
    >
    </h2>
  );
}
