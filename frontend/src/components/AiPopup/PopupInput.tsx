import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { LucideMic } from "lucide-react";
import ResponseWindow from "./ResponseWindow";

type PopupInputProps = {
  setOpenParent?: (value: boolean) => void;
};

interface TaskSummary {
  ID: number;
  Summary: string;
  Rating: number;
}

export default function PopupInput({ setOpenParent }: PopupInputProps) {
  const [summary, setSummary] = useState<string>(" ");
  const [taskGrade, setTaskGrade] = useState<number>(1);
  const [aiResponse, setAiResponse] = useState<Object>("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5173/api/task", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Session: "da5b8893-d6ca-5c1c-9a9c-91f40a2a3649",
        },
        body: JSON.stringify({
          id: 1,
          summary: summary,
          rating: taskGrade,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.statusMessage);
      }

      const data = await response.json();
      console.log("Task summarized successfully:", data);
      setAiResponse(data);
    } catch (error) {
      console.error("Error updating task:", error);
      if (setOpenParent) {
        setOpenParent(false);
      }
    }
  }

  return aiResponse ? (
    <ResponseWindow response={aiResponse}></ResponseWindow>
  ) : (
    <div className="w-full h-full bg-accent border-3 border-background p-8 rounded-xl">
      <form
        className="flex flex-col justify-start items-center gap-5"
        onSubmit={handleSubmit}
      >
        <Label
          htmlFor="summary"
          className="text-accent-foreground text-lg font-medium"
        >
          Czy chciałbyś podsumować swoje zadanie?
        </Label>
        <div className="w-full relative">
          <Textarea
            id="summary"
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="min-h-48 max-w-xld text-foreground whitespace-pre-wrap resize-none text-wrap border-background"
          ></Textarea>
          <LucideMic
            onClick={() => {
              alert("Under Construction");
            }}
            className="ease-in-out text-background bg-accent-foreground w-12 h-12 p-2 rounded-4xl absolute bottom-2 right-4 cursor-pointer hover:bg-background hover:text-primary"
          ></LucideMic>
        </div>
        <Label
          htmlFor="slider"
          className="text-accent-foreground text-lg font-medium"
        >
          Jak oceniłbyś satysfakcje z tego zadania (1-5)?
        </Label>
        <div className="w-full">
          <Slider
            min={1}
            max={5}
            value={[taskGrade]}
            id="slider"
            name="slider"
            onValueChange={([val]) => setTaskGrade(val)}
          ></Slider>
          <h1 className="text-accent-foreground mt-2">{taskGrade}</h1>
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-full h-full cursor-pointer lg:text-xl bg-linear-to-l from-foreground/40 to-accent-foreground/60 hover:from-accent-foreground/80 hover:to-accent/80 hover:text-background rounded-4xl"
          >
            Zakończ zadanie i podsumuj
          </Button>
        </div>
      </form>
    </div>
  );
}
