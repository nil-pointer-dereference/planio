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
import AiPopup from "@/components/AiPopup/AiPopup";
import TaskPopup from "@/components/TaskPopup/TaskPopup";

export default function Dayplan() {
  return (
    <>
      <div>
        <AiPopup></AiPopup>
        <TaskPopup></TaskPopup>
        <Card className="w-1/4 min-w-[32rem]">
          {" "}
          {/* Was w-1/6 min-w-80 */}
          <CardHeader>
            <CardTitle>Plan dnia</CardTitle>
            <CardDescription className="flex flex-row items-center justify-around pt-4">
              <Button variant="outline" size="icon">
                <ChevronLeft />
              </Button>
              <div className="">sobota - 17.05.2025</div>
              <Button variant="outline" size="icon">
                <ChevronRight />
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DayplanTimeline />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
