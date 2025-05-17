import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import TaskInput from "./TaskInput";
import { LucidePlusSquare } from "lucide-react";
import { useState } from "react";

export default function TaskPopup() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed max-w-lg right-20 top-45">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="cursor-pointer bg-primary p-1.5 rounded-lg hover:bg-linear-to-l from-background/40 to-primary/60 hover:from-primary/80 hover:to-accent/80 hover:text-background">
          <div className="flex justify-center items-center text-2xl gap-3 p-3">
            <LucidePlusSquare></LucidePlusSquare>
            <h1>Dodaj Zadanie</h1>
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={15} className="animate-fade-in">
          <TaskInput setOpenParent={setOpen}></TaskInput>
        </PopoverContent>
      </Popover>
    </div>
  );
}
