import DatePicker from "@/components/date-picker";
import LoadingScreen from "@/components/loading-screen";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/use-auth";
import {
  ArrowLeft,
  BotMessageSquare,
  CalendarDays,
  KeyRound,
  Tag,
  UserCircle,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  name: z.string(),
  birthdate: z.date(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [consent, setConsent] = useState<boolean>(false);
  const { isPosting, register } = useAuth();
  const a = useForm<RegisterSchema>({
    defaultValues: {
      username: "",
      password: "",
      name: "",
      birthdate: new Date(),
    },
  });

  const handleSubmit = a.handleSubmit(async (fields) => {
    await register({
      ...fields,
      birthdate: fields.birthdate.toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  });

  return (
    <div className="flex min-h-svh flex-col gap-4 w-full items-center justify-center p-6 md:p-10">
      <Link
        to="/"
        className="absolute left-6 top-6 flex items-center rounded-full px-6 py-5 text-lg text-foreground underline-offset-4 hover:underline hover:text-secondary-foreground group"
      >
        <ArrowLeft className="size-6 transition-transform duration-300 ease-in-out group-hover:-translate-x-2" />
        <span className="ml-2">Powrót</span>
      </Link>

      <BotMessageSquare className="inline text-primary size-[8rem] pb-2" />
      <div className="flex gap-2 items-center ">
        <h1 className="lg:text-[3rem] text-3xl text-center flex items-center gap-4 fluid-text-animation group">
          Dołącz do nas
        </h1>
      </div>
      <p className="fontbold text-muted-foreground text-md pb-8 text-center">
        Planio nie może się doczekać na współpracę z Tobą!
        <br />
        Zarejestruj się, aby przejść dalej!
      </p>

      <div className="flex flex-col w-full justify-center items-center">
        <Card className="-pt-4">
          <CardContent>
            <Form {...a}>
              <form onSubmit={handleSubmit}>
                <FormField
                  control={a.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Tag className="size-5 text-primary"></Tag>
                        Imię
                      </FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input
                          className="min-w-xs"
                          placeholder="Imię"
                          {...field}
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={a.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="pt-5">
                      <FormLabel>
                        <UserCircle className="size-5 text-primary"></UserCircle>
                        Nazwa użytkownika
                      </FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input
                          className="min-w-xs"
                          placeholder="Nazwa użytkownika"
                          {...field}
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={a.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="pt-5">
                      <FormLabel>
                        <KeyRound className="size-5 text-primary"></KeyRound>
                        Hasło
                      </FormLabel>
                      <FormDescription></FormDescription>
                      <FormControl>
                        <Input
                          className="w-full"
                          type="password"
                          placeholder="Hasło"
                          {...field}
                        ></Input>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={a.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="pt-5">
                      {" "}
                      <FormLabel>
                        <CalendarDays className="size-5 text-primary"></CalendarDays>
                        Data urodzenia
                      </FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          setValue={field.onChange}
                        ></DatePicker>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  name=""
                  render={() => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow mt-5">
                      <FormControl>
                        <Checkbox
                          checked={consent}
                          onCheckedChange={() => setConsent(!consent)}
                        ></Checkbox>
                      </FormControl>
                      <FormLabel className="text-sm text-muted-foreground max-w-xs">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w
                        celu personalizacji Planio, w tym analizy feedbacku i
                        ulepszania rekomentacji.
                      </FormLabel>
                    </FormItem>
                  )}
                ></FormField>
                <div className="pt-5">
                  <Button disabled={!consent} type="submit" className="w-full">
                    Zarejestruj się
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <LoadingScreen open={isPosting}></LoadingScreen>
      </div>
    </div>
  );
}
