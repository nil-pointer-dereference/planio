import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import PopupInput from "./PopupInput";
import { useState } from "react";
import ResponseWindow from "./ResponseWindow";

export default function AiPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute max-w-lg right-50 top-20">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="cursor-pointer bg-accent p-3 rounded-lg hover:bg-linear-to-l from-background/40 to-accent-foreground/60 hover:from-accent-foreground/80 hover:to-accent/80 hover:text-background">
          Manage Task
        </PopoverTrigger>
        <PopoverContent sideOffset={15} className="animate-fade-in max-w-lg">
          <PopupInput setOpenParent={setOpen}></PopupInput>
        </PopoverContent>
      </Popover>
    </div>
  );
}
