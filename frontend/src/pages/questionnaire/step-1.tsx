import { Card, CardContent } from "@/components/ui/card";
import { type QuestionnaireSchema, type StepProps } from ".";
import { useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function StepOne(props: StepProps) {
  const [_, setParams] = useSearchParams();
  const a = useForm<Partial<QuestionnaireSchema>>({
    defaultValues: {
      name: "",
      age: 18,
      doesWork: false,
    },
  });

  const handleSubmit = a.handleSubmit((fields) => {
    props.updateFormState(fields);
    setParams((params) => {
      params.set("step", "2");
      return params;
    });
  });

  return (
    <Card className="min-w-lg">
      <CardContent>
        <Form {...a}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={a.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Podaj swoje imię" {...field}></Input>
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
              render={() => (
                <FormItem className="mt-5">
                  <FormLabel>Czy pracujesz?</FormLabel>
                  <FormControl className="flex">
                    <RadioGroup
                      defaultValue="false"
                      className="flex gap-2"
                      name="doesWork"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="doesWork-yes" />
                        <Label htmlFor="yes">Tak</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="doesWork-no" />
                        <Label htmlFor="no">Nie</Label>
                      </div>
                    </RadioGroup>
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
