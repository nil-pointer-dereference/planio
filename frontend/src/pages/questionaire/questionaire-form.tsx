import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "./date-picker";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function QuestionaireForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("flex flex-col text-center gap-6", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Jeszcze trochę...</CardTitle>
          <CardDescription>
            Opowiedz nam trochę o sobie. Pozwoli nam to lepiej dopasować się do
            twoich potrzeb.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="firstName">Jak masz na imię?</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Powiedz jak się nazywasz"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date-of-birth">Ile masz lat?</Label>
                <div className="w-full flex items-center justify-center">
                  <DatePicker />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="occupation">Czym się zajmujesz?</Label>
                <div className="w-full flex items-center p-3">
                  <RadioGroup defaultValue="comfortable">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="studying" id="r1" />
                      <Label htmlFor="r1">Uczę się</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="working" id="r2" />
                      <Label htmlFor="r2">Pracuję</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="leisure" id="r3" />
                      <Label htmlFor="r3">Szukam zajęcia</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="leisure" id="r3" />
                      <Label htmlFor="r3">Coś innego</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="life-goals">Jakie są twoje cele?</Label>
                <Textarea className="resize-none"></Textarea>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="life-goals">
                  Co sprawia, że czujesz się wypoczęty?
                </Label>
                <Textarea className="resize-none"></Textarea>
              </div>
              <Button type="submit" className="w-full">
                Zaczynajmy :)
              </Button>
            </div>
            {/* <div className="mt-4 text-center text-sm">
              Masz już konto?{" "}
              <a href="/login" className="underline underline-offset-4">
                Zaloguj się
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
