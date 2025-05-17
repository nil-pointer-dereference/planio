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
    <div className="absolute max-w-lg left-50 top-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="cursor-pointer bg-primary p-1.5 rounded-lg hover:bg-linear-to-l from-background/40 to-primary/60 hover:from-primary/80 hover:to-accent/80 hover:text-background">
          <LucidePlusSquare></LucidePlusSquare>
        </PopoverTrigger>
        <PopoverContent sideOffset={15} className="animate-fade-in">
          <TaskInput setOpenParent={setOpen}></TaskInput>
        </PopoverContent>
      </Popover>
    </div>
  );
}
