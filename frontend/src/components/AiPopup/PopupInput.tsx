import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { LucideMic } from "lucide-react";

type PopupInputProps = {
  setOpenParent?: (value: boolean) => void;
};

export default function PopupInput({ setOpenParent }: PopupInputProps) {
  const [summary, setSummary] = useState<string>(" ");
  const [taskGrade, setTaskGrade] = useState<number>(0);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(summary);
    console.log(taskGrade);
    if (setOpenParent) {
      setOpenParent(false);
    }
  }
  return (
    <div className="w-full h-full bg-accent border-3 border-background p-8 rounded-xl">
      <form
        className="flex flex-col justify-start items-center gap-5"
        onSubmit={handleSubmit}
      >
        <Label
          htmlFor="summary"
          className="text-background text-lg font-medium"
        >
          Czy chciałbyś podsumować swoje zadanie?
        </Label>
        <div className="w-full relative">
          <Textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="min-h-48 text-background text-wrap border-background"
          ></Textarea>
          <LucideMic
            onClick={() => {
              alert("Under Construction");
            }}
            className="ease-in-out text-background bg-primary w-12 h-12 p-2 rounded-4xl absolute bottom-2 right-4 cursor-pointer hover:bg-background hover:text-primary"
          ></LucideMic>
        </div>
        <Label
          htmlFor="summary"
          className="text-background text-lg font-medium"
        >
          Jak oceniłbyś satysfakcje z tego zadania (1-5)?
        </Label>
        <div className="w-full">
          <Slider
            min={1}
            max={5}
            value={[taskGrade]}
            onValueChange={([val]) => setTaskGrade(val)}
          ></Slider>
          <h1 className="text-background mt-2">{taskGrade}</h1>
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-full h-full cursor-pointer lg:text-xl bg-linear-to-l from-background/40 to-primary/60 hover:from-primary/80 hover:to-accent/80 hover:text-background rounded-4xl"
          >
            Zakończ zadanie i podsumuj
          </Button>
        </div>
      </form>
    </div>
  );
}
