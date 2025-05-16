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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function StepTwo(props: StepProps) {
  const [_, setParams] = useSearchParams();
  const a = useForm<Partial<QuestionnaireSchema>>({
    defaultValues: {
      interests: "",
      goals: "",
      freeTimeActivities: "",
      rest: "",
      entertainment: "",
    },
  });

  const handleSubmit = a.handleSubmit((fields) => {
    props.updateFormState(fields);
    setParams((params) => {
      params.set("step", "3");
      return params;
    });
  });

  return (
    <Card className="pl-20 pr-20 pt-10 pb-10">
      <CardHeader>
        <CardTitle>Krok drugi</CardTitle>
        <CardDescription>Opowiedz nam coś więcej o sobie</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...a}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={a.control}
              name={"name"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Imię</FormLabel>
                  <FormDescription>Jak masz na imię?</FormDescription>
                  <FormControl>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"age"}
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Wiek</FormLabel>
                  <FormDescription>Ile masz lat?</FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Podaj swój wiek"
                      {...field}
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"doesWork"}
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Zatrudnienie</FormLabel>
                  <FormDescription>Czy pracujesz?</FormDescription>
                  <FormControl className="flex">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    ></Switch>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <div className="w-full flex pt-10 pl-5 pr-5">
              <Button disabled>Wróć</Button>
              <div className="flex-grow"></div>
              <Button type="submit">Dalej</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
