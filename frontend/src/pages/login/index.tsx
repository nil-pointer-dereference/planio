import LoadingScreen from "@/components/loading-screen";
import {
  BotMessageSquare,
  KeyRound,
  ArrowLeft,
  UserCircle,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

//eslint-disable-next-line
const loginSchema = z.object({ username: z.string(), password: z.string() });

type LoginSchema = z.infer<typeof loginSchema>;
export default function LoginPage() {
  const { isPosting, login } = useAuth();
  const a = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = a.handleSubmit(async (fields) => {
    console.log(fields);
    await login(fields);
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
          Planio czeka na ciebie
        </h1>
      </div>
      <p className="fontbold text-muted-foreground text-md pb-8 text-center">
        Nasz code assistant Planio jest gotowy, aby pomóc Ci zacząć.
        <br />
        Zaloguj się, by kontynuować!
      </p>

      <div className="flex flex-col w-full justify-center items-center">
        <Card className="-pt-4">
          <CardContent>
            <Form {...a}>
              <form onSubmit={handleSubmit}>
                <FormField
                  control={a.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
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
                <div className="pt-5">
                  <Button type="submit" className="w-full">
                    Zaloguj się
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
