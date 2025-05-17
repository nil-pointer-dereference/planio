import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "react-day-picker";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const a = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = a.handleSubmit((fields) => {
    console.log(fields);
  });

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Tytuł</CardTitle>
          <CardDescription>Opis</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...a}>
            <form onSubmit={handleSubmit}>
              <FormField
                control={a.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa użytkownika</FormLabel>
                    <FormControl>
                      <Input placeholder="Nazwa użytkownika" {...field}></Input>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button type="submit">Zaloguj się</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
