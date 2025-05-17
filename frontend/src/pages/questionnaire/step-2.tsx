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
import { Textarea } from "@/components/ui/textarea";

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
    <Card>
      <CardContent>
        <Form {...a}>
          <form onSubmit={handleSubmit}>
            <FormField
              control={a.control}
              name={"interests"}
              render={({ field }) => (
                <FormItem>
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
                  <FormDescription>
                    Co chciałbyś/chciałabyś z nami osiągnąć?
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className=""
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
                  <FormDescription>
                    Co najczęściej robisz w wolnym czasie?
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
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
                  <FormDescription>
                    W jaki sposób lubisz odpoczywać? Aktywnie, a może bardziej
                    pasywnie?
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
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
                  <FormDescription>
                    Jakie są twoje ulubione spoosby na rozrywkę?
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      cols={40}
                      className=""
                      {...field}
                    ></Textarea>
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <div className="w-full flex pt-10 pl-5 pr-5">
              <Button type="submit" onClick={handleBack}>
                Wróć
              </Button>
              <div className="flex-grow"></div>
              <Button type="submit">Dalej</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
