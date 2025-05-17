import type { ControllerRenderProps } from "react-hook-form";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { QuestionnaireSchema } from "@/pages/questionnaire";

type TimePickerProps = {
  time?: string;
  field: ControllerRenderProps<Partial<QuestionnaireSchema>>;
};

export default function TimePicker({ field }: TimePickerProps) {
  return (
    <Select
      defaultValue={(field.value as string) ?? "00:00"}
      onValueChange={field.onChange}
    >
      <SelectTrigger className="font-normal w-full focus:ring-0  focus:ring-offset-0">
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
              <SelectItem key={i} value={`${hour}:${minute}`}>
                {hour}:{minute}
              </SelectItem>
            );
          })}
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
