import { MoveRight } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type TimePickerRangeProps = {
  value: string;
  setValue: (value: string) => void;
  disabled: boolean;
};

export default function TimePickerRange({
  value,
  setValue,
  disabled,
}: TimePickerRangeProps) {
  const [start, end] = [value.split("-")[0], value.split("-")[1]];

  const handleStartChange = (value: string) => {
    const newValue = `${value}-${end}`;
    setValue(newValue);
  };

  const handleEndChange = (value: string) => {
    const newValue = `${start}-${value}`;
    setValue(newValue);
  };

  return (
    <div className="flex w-full items-center">
      <Select
        disabled={disabled}
        defaultValue={start}
        onValueChange={handleStartChange}
      >
        <SelectTrigger
          disabled={disabled}
          className="font-normal w-full focus:ring-0  focus:ring-offset-0"
        >
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
      <MoveRight size={"2rem"} className="mx-5"></MoveRight>
      <Select
        disabled={disabled}
        defaultValue={end}
        onValueChange={handleEndChange}
      >
        <SelectTrigger
          disabled={disabled}
          className="font-normal w-full focus:ring-0  focus:ring-offset-0"
        >
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
    </div>
  );
}
