import { Button } from "@/components/ui/button";
import { ArrowUpRight, BotMessageSquare } from "lucide-react";
import { Link } from "react-router";

export default function LandingPage() {
  return (
    <div className="w-max h-screen bg-background gap-8 flex flex-col justify-center items-center">
      <div className="absolute rounded-full opacity/5 -top-1/2 -translate-x-1/2 left-1/2 w-[10rem] h-[50rem] rotate-60 bg-primary blur-[16rem] z-100"></div>
      <div className="w-full flex flex-col justify-start items-center gap-12">
        <h1 className="lg:text-[10rem] text-7xl text-center flex items-center gap-6 fluid-text-animation group">
          <BotMessageSquare className="inline text-primary size-[9.5rem] pb-4" />
          Planio{" "}
        </h1>
        <h1 className="lg:text-2xl !text-xl text-muted-foreground text-wrap text-center w-3/4 !font-['Poppins']">
          Planio to inteligentny asystent planowania, który automatycznie
          dostosowuje Twój harmonogram do zmieniających się potrzeb i wykonanych
          zadań.
        </h1>
      </div>
      <Link
        to="/login"
        className="w-full items-center flex group justify-center"
      >
        <Button
          className="relative rounded-full text-primary border-primary text-2xl !px-6 !py-6 bg-opacity-0 bg-[radial-gradient(circle,_rgba(170,121,246,0.4)_0%,_transparent_100%)] bg-no-repeat bg-center bg-[length:0px_100%] hover:bg-[length:100%_100%] hover:bg-transparent hover:text-primary hover:!px-8 transition-all duration-300"
          variant="outline"
        >
          Zaplaniuj swój dzień
          <ArrowUpRight className="size-6" />
        </Button>
      </Link>
    </div>
  );
}
