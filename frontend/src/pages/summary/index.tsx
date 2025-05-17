import { Card, CardContent } from "@/components/ui/card";
import { BotMessageSquare } from "lucide-react";
import { useState } from "react";

export default function SummaryPage() {
  const [savedHours, setSavedHours] = useState<number>(0);
  const [tooltipMsg, setTooltipMsg] = useState<string>("");
  return (
    <div className="flex gap-12 min-h-svh w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full flex flex-col justify-start items-center gap-12">
        <h1 className="lg:text-[10rem] text-7xl text-center flex items-center gap-6 fluid-text-animation group">
          <BotMessageSquare className="inline text-primary size-[9.5rem] pb-4" />
          {tooltipMsg !== "" && (
            <span
              className="bg-background p-2 rounded-md text-foreground text-xs"
              data-tooltip
            >
              {tooltipMsg}
            </span>
          )}
          Planio{" "}
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2>
              Zaoszczędziłeś/aś <strong>{savedHours}</strong> godzin dzięki
              dobrej organizacji, z czego <strong>{hobbyHours}</strong> godzin
              spędziłeś/aś na swoim hobby. Tak trzymaj!
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
