import type { HTMLAttributes } from "react";

export default function H1(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      {...props}
    >
    </h1>
  );
}
