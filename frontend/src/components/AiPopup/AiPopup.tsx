import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import PopupInput from "./PopupInput";
import { useState } from "react";
import { LucideFileEdit } from "lucide-react";
import ResponseWindow from "./ResponseWindow";

export default function AiPopup() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed max-w-lg right-20 top-25 z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="cursor-pointer lg:text-sm bg-accent p-1 rounded-lg hover:bg-linear-to-l from-background/40 to-accent-foreground/60 hover:from-accent-foreground/80 hover:to-accent/80 hover:text-background">
          <div className="flex justify-center items-center text-2xl gap-3 p-3">
            <LucideFileEdit></LucideFileEdit>
            Zarządzaj Zadaniem
          </div>
        </PopoverTrigger>
        <PopoverContent sideOffset={15} className="animate-fade-in max-w-lg">
          <PopupInput setOpenParent={setOpen}></PopupInput>
        </PopoverContent>
      </Popover>
    </div>
  );
}
