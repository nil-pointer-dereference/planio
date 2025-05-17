import Dayplan from "./dayplan";
import { Link } from "react-router";
import { ArrowLeft, BotMessageSquare } from "lucide-react";

export default function DayplanPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 flex-col">
      <Link
        to="/"
        className="absolute left-6 top-6 flex items-center rounded-full px-6 py-5 text-lg text-foreground underline-offset-4 hover:underline hover:text-secondary-foreground group"
      >
        <ArrowLeft className="size-6 transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
        <span className="ml-2">Powrót</span>
      </Link>
      <BotMessageSquare className="inline text-primary size-[8rem] pb-2" />
      <div className="flex gap-2 items-center ">
        <h1 className="lg:text-[3rem] text-3xl text-center flex items-center gap-4 fluid-text-animation group">
          Zobacz co dla ciebie przygotowalem!
        </h1>
      </div>
      <p className="fontbold text-muted-foreground max-w-2/4 text-md pb-8 text-center">
        Zobacz co dla ciebie przygotowalem
      </p>
      <Dayplan />
    </div>
  );
}
