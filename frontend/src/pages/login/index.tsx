import LoadingScreen from "@/components/loading-screen";
import H2 from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

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
    <div className="flex flex-col w-full justify-center items-center">
      <Card className="pl-50 pr-50 pt-10 pb-20">
        <CardHeader>
          <CardTitle>
            <H2>Zaloguj się</H2>
          </CardTitle>
          <CardDescription>
            Miło cię widzieć :) Zaloguj się, aby przejrzeć swój plan
            na dzisiaj!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...a}>
            <form onSubmit={handleSubmit}>
              <FormField
                control={a.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="pt-5">
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormDescription></FormDescription>
                    <FormControl>
                      <Input placeholder="Nazwa użytkownika" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={a.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="pt-5">
                    <FormLabel>Hasło</FormLabel>
                    <FormDescription></FormDescription>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Hasło"
                        {...field}
                      ></Input>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <div className="pt-5">
                <Button type="submit">Zaloguj się</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <LoadingScreen open={isPosting}></LoadingScreen>
    </div>
  );
}
