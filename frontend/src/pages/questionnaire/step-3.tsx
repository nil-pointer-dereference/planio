import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import H2 from "@/components/typography/h2";

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
    <Card className="pl-40 pr-40 pt-10 pb-10">
      <CardHeader>
        <CardTitle><H2>Krok trzecie</H2></CardTitle>
        <CardDescription>
          Chcielibyśmy poznać twoje codzienne nawyki
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...a}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={a.control}
              name={"levelOfStress"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Poziom stresu</FormLabel>
                  <FormDescription>
                    Na jakim poziomie oceniasz swój codzienny stres?
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
                  <FormLabel>Intensywność dnia</FormLabel>
                  <FormDescription>
                    Jak bardzo aktywny/aktywna jesteś w ciągu dnia? Jak wiele
                    czynności lubisz się podejmować?
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
                  <FormLabel>Doświadczenie w sporcie</FormLabel>
                  <FormDescription>
                    Jak dużo i jak często lubisz ćwiczyć/spędzać czas aktywnie?
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
              name={"wakeUpTime"}
              render={({ field }) => (
                <FormItem className="mt-5">
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
                <FormItem className="mt-5">
                  <FormLabel>Ilość snu</FormLabel>
                  <FormDescription>Jak długo zwykle śpisz?</FormDescription>
                  <FormControl>
                    <Select
                      defaultValue={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="font-normal focus:ring-0 w-[240px] focus:ring-offset-0">
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
            <div className="w-full flex pt-10 pl-5 pr-5">
              <Button type="submit" onClick={handleBack}>Wróć</Button>
              <div className="flex-grow"></div>
              <Button type="submit">Zakończ</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
