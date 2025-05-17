import type { ControllerRenderProps } from "react-hook-form";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { QuestionnaireSchema } from "@/pages/questionnaire";

type TimePickerProps = {
  taskTime: number;
  setTaskTime: (value: number) => void;
};

export default function TimePickerTask({
  taskTime,
  setTaskTime,
}: TimePickerProps) {
  return (
    <Select
      defaultValue={String(taskTime) ?? "00:00"}
      onValueChange={(e) => {
        setTaskTime(Number(e));
      }}
    >
      <SelectTrigger className="font-normal text-gray-500 focus:ring-0 w-[240px] focus:ring-offset-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[15rem]">
          {Array.from({ length: 96 }).map((_, i) => {
            const hour = Math.floor(i / 4)
              .toString()
              .padStart(2, "0");
            const minute = ((i % 4) * 15).toString().padStart(2, "0");
            return (
              <SelectItem key={i} value={String(i * 15)}>
                {hour}:{minute}
              </SelectItem>
            );
          })}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
