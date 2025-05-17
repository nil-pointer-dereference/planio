import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { useState } from "react";
import { Slider } from "../ui/slider";
import useSWR from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import TimePickerTask from "./TimePickerTask";

type PopupInputProps = {
  setOpenParent?: (value: boolean) => void;
};

interface Task {
  ID: number;
  UserID: number;
  Type: TaskType;
  Completed: boolean;
  Title: string;
  EstimatedMinutes: number;
  Priority: number;
  Summary: string;
  Rating: number;
}

interface TaskType {
  ID: number;
  Type: string;
}

const fetcher = (url: any) => fetch(url).then((res) => res.json());

export default function PopupInput({ setOpenParent }: PopupInputProps) {
  const [title, setTitle] = useState<string>(" ");
  const [taskType, setTaskType] = useState<string>("");
  const [taskTime, setTaskTime] = useState<number>(0);
  const [taskPriority, setTaskPriority] = useState<number>(0);

  const { data, error, isLoading } = useSWR<TaskType[]>(
    "http://localhost:3000/tasktypes",
    fetcher
  );

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/task", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          type: taskType,
          EstimatedMinutes: taskTime,
          priority: taskPriority,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.statusMessage);
      }

      const data = await response.json();
      console.log("Task created successfully:", data);

      if (setOpenParent) {
        setOpenParent(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
      if (setOpenParent) {
        setOpenParent(false);
      }
    }
  }
  return (
    <div className="w-full h-full bg-accent border-3 border-background p-8 rounded-xl">
      <h1 className="text-background text-xl text-center font-medium mb-5">
        Dodaj nowe zadanie
      </h1>
      <form
        className="flex flex-col justify-start items-center gap-2"
        onSubmit={handleSubmit}
      >
        <Label
          htmlFor="summary"
          className="text-background text-left text-md font-medium w-full"
        >
          Nazwa zadania:
        </Label>
        <div className="w-full">
          <Input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="min-h-10 text-background text-wrap border-background"
          ></Input>
        </div>
        <Label className="text-background text-left text-md font-medium w-full">
          Rodzaj zadania:
        </Label>
        <Select value={taskType} onValueChange={setTaskType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Rodzaj" />
          </SelectTrigger>
          <SelectContent>
            {isLoading ? (
              <SelectItem value="loading">Loading...</SelectItem>
            ) : error ? (
              <SelectItem value="error">Blad przy ladowaniu typow</SelectItem>
            ) : data && data.length > 0 ? (
              data.slice(0, 19).map((taskType) => (
                <SelectItem key={taskType.ID} value={taskType.Type}>
                  {taskType.Type}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none">Brak dostepnych typow</SelectItem>
            )}
          </SelectContent>
        </Select>
        <Label className="text-background text-left text-md font-medium w-full">
          Przewidziany czas na zadanie:
        </Label>
        <div className="w-full">
          <TimePickerTask
            taskTime={taskTime}
            setTaskTime={setTaskTime}
          ></TimePickerTask>
        </div>
        <Label className="text-background text-left text-md font-medium w-full">
          Ustaw priorytet zadania (1-5):
        </Label>
        <div className="w-full">
          <Slider
            min={1}
            max={5}
            value={[taskPriority]}
            id="slider"
            name="slider"
            onValueChange={([val]) => setTaskPriority(val)}
          ></Slider>
          <h1 className="text-background mt-2">{taskPriority}</h1>
        </div>
        <div className="flex justify-center items-center">
          <Button
            type="submit"
            className="w-full h-full cursor-pointer lg:text-xl bg-linear-to-l from-background/40 to-primary/60 hover:from-primary/80 hover:to-accent/80 hover:text-background rounded-4xl"
          >
            Dodaj zadanie
          </Button>
        </div>
      </form>
    </div>
  );
}
