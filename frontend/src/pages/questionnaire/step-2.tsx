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
import { Textarea } from "@/components/ui/textarea";
import H2 from "@/components/typography/h2";

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

  const handleBack = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setParams((params) => {
      params.set("step", "1");
      return params;
    });
  };

  return (
    <Card className="pl-20 pr-20 pt-10 pb-10">
      <CardHeader>
        <CardTitle><H2>Krok drugi</H2></CardTitle>
        <CardDescription>Opowiedz nam coś więcej o sobie</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...a}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={a.control}
              name={"interests"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Zaintersowanie</FormLabel>
                  <FormDescription>Jakie masz hobby?</FormDescription>
                  <FormControl>
                    <Textarea placeholder="" className="" {...field}></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"goals"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Cele</FormLabel>
                  <FormDescription>Co chciałbyś/chciałabyś z nami osiągnąć?</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className=""
                      rows={5}
                      cols={40}
                      {...field}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"freeTimeActivities"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Czas wolny</FormLabel>
                  <FormDescription>Co najczęściej robisz w wolnym czasie?</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      rows={5}
                      cols={40}
                      className=""
                      {...field}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"rest"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Odpoczynek</FormLabel>
                  <FormDescription>W jaki sposób lubisz odpoczywać? Aktywnie, a może bardziej pasywnie?</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      rows={5}
                      cols={40}
                      className=""
                      {...field}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={a.control}
              name={"entertainment"}
              render={({ field }) => (
                <FormItem className="pt-5">
                  <FormLabel>Rozrywka</FormLabel>
                  <FormDescription>Jakie są twoje ulubione spoosby na rozrywkę?</FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      rows={5}
                      cols={40}
                      className=""
                      {...field}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <div className="w-full flex pt-10 pl-5 pr-5">
              <Button type="submit" onClick={handleBack}>Wróć</Button>
              <div className="flex-grow"></div>
              <Button type="submit">Dalej</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
