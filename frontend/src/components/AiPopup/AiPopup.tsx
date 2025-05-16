import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import PopupInput from "./PopupInput";
import { useState } from "react";

export default function AiPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="cursor-pointer bg-primary p-3 rounded-lg hover:bg-linear-to-l from-background/40 to-primary/60 hover:from-primary/80 hover:to-accent/80 hover:text-background">
          Manage Task
        </PopoverTrigger>
        <PopoverContent sideOffset={15} className="animate-fade-in">
          <PopupInput setOpenParent={setOpen}></PopupInput>
        </PopoverContent>
      </Popover>
    </div>
  );
}
