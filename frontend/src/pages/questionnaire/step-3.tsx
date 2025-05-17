import { Card, CardContent } from "@/components/ui/card";
import { type QuestionnaireSchema, type StepProps } from ".";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import TimePicker from "@/components/time-picker";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
const hours = [4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function StepThree(props: StepProps) {
  const [_, setParams] = useSearchParams();
  const a = useForm<Partial<QuestionnaireSchema>>({
    defaultValues: {
      levelOfStress: 1,
      dayIntensiveness: 1,
      sportExperience: 1,
      wakeUpTime: "08:00",
      sleepHours: 4,
      doesWork: false,
    },
  });

  const handleSubmit = a.handleSubmit((fields) => {
    props.updateFormState(fields);
  });

  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setParams((params) => {
      params.set("step", "2");
      return params;
    });
  };

  return (
    <Card>
      <CardContent>
        <Form {...a}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={a.control}
              name={"levelOfStress"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="pb-2">
                    Na jakim poziomie oceniasz swój codzienny stres?
                  </FormLabel>
                  <FormDescription className="flex justify-between">
                    <span className="mr-auto w-full text-pretty">
                      Totalny luz
                    </span>
                    <span className="text-pretty min-w-max">
                      Stres na maksa
                    </span>
                  </FormDescription>
                  <FormControl>
                    <Slider
                      max={5}
                      min={1}
                      step={1}
                      defaultValue={[field.value as number]}
                      onValueChange={field.onChange}
                    ></Slider>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"dayIntensiveness"}
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>
                    Jak bardzo aktywny/aktywna jesteś w ciągu dnia? Jak wiele
                    czynności lubisz się podejmować?
                  </FormLabel>
                  <FormDescription className="flex justify-between">
                    <span className="mr-auto w-full text-pretty">
                      Zen mistrz prokrastynacji
                    </span>
                    <span className="text-pretty min-w-max">
                      Multitasking ninja
                    </span>
                  </FormDescription>
                  <FormControl>
                    <Slider
                      max={5}
                      min={1}
                      step={1}
                      defaultValue={[field.value as number]}
                      onValueChange={field.onChange}
                    ></Slider>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"sportExperience"}
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>
                    Jak dużo i jak często lubisz ćwiczyć/spędzać czas aktywnie?
                  </FormLabel>

                  <FormDescription className="flex justify-between">
                    <span className="mr-auto w-full text-pretty">
                      Kanapowicz pospility
                    </span>
                    <span className="text-pretty min-w-max">David Goggins</span>
                  </FormDescription>
                  <FormControl>
                    <Slider
                      max={5}
                      min={1}
                      step={1}
                      defaultValue={[field.value as number]}
                      onValueChange={field.onChange}
                    ></Slider>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <div className="grid grid-cols-2 gap-12 justify-between">
              <FormField
                control={a.control}
                name={"wakeUpTime"}
                render={({ field }) => (
                  <FormItem className="mt-5 w-full">
                    <FormLabel>Godzina pobudki</FormLabel>
                    <FormDescription>
                      O jakiej godzinie zwykle wstajesz z łóżka?
                    </FormDescription>
                    <FormControl>
                      <TimePicker field={field}></TimePicker>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={a.control}
                name={"sleepHours"}
                render={({ field }) => (
                  <FormItem className="mt-5  w-full">
                    <FormLabel>Ilość snu</FormLabel>
                    <FormDescription>Jak długo zwykle śpisz?</FormDescription>
                    <FormControl>
                      <Select
                        defaultValue={String(field.value)}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="font-normal focus:ring-0 w-full focus:ring-offset-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <ScrollArea className="h-[15rem]">
                            {hours.map((i) => (
                              <SelectItem key={i} value={String(i)}>
                                {i}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="w-full flex pt-10 pl-5 pr-5">
              <Button type="submit" onClick={handleBack}>
                Wróć
              </Button>
              <div className="flex-grow"></div>
              <Button type="submit">Zakończ</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
