import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function LandingPage() {
  return (
      <div className="w-full h-full bg-radial-[at_5%_100%] from-background to-primary to-90% gap-10 flex flex-col justify-center items-center pl-10 pr-10">
        <div className="w-full flex flex-col justify-start items-center gap-8">
          <h1 className="lg:text-[20rem] text-9xl text-center fluid-text-animation ">
            WIP
          </h1>
          <h1 className="lg:text-3xl text-lg text-wrap text-center w-3/4 ">
            Nasza Aplikacja jest bardzo fajna i na pewno będzie pomocna w
            rozwiązywaniu twoich problemów psychicznych. Tak o bez kitu serio.{" "}
            <span className="text-secondary/90">
              Gdzie są dwa sosy czosnkowe?
            </span>{" "}
            Mówie 100% bez beki Gdzie są dwa sosy czosnkowe?
          </h1>
        </div>
        <Link className="w-1/3 min-w-3xs h-1/12" to="/login">
          <Button
            className="w-full h-full lg:text-3xl bg-linear-to-l from-background/40 to-primary/60 hover:from-primary/80 hover:to-accent/80 hover:border-2 hover:border-primary hover:text-background rounded-4xl"
            variant="outline"
          >
            Get Started
          </Button>
        </Link>
      </div>
  );
}
