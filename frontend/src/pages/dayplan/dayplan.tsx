import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DayplanTimeline from "./timeline";

export default function Dayplan() {
  return (
    <>
      <Card className="w-1/4 min-w-[32rem]">
        {" "}
        {/* Was w-1/6 min-w-80 */}
        <CardHeader>
          <CardTitle>Plan dnia</CardTitle>
          <CardDescription className="flex flex-row items-center justify-around pt-4">
            <Button variant="outline" size="icon">
              <ChevronLeft />
            </Button>
            <div className="">
              {new Date().toLocaleDateString("pl-PL", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
            <Button variant="outline" size="icon">
              <ChevronRight />
            </Button>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DayplanTimeline />
        </CardContent>
      </Card>
    </>
  );
}
