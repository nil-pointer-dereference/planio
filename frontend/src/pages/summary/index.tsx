import { BotMessageSquare } from "lucide-react";
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 156, mobile: 80 },
  { month: "February", desktop: 140, mobile: 50 },
  { month: "March", desktop: 50, mobile: 40 },
  { month: "April", desktop: 80, mobile: 35 },
  { month: "May", desktop: 98, mobile: 29 },
  { month: "June", desktop: 73, mobile: 34 },
];
const chartData2 = [
  { month: "January", desktop: 56, mobile: 20 },
  { month: "February", desktop: 40, mobile: 10 },
  { month: "March", desktop: 70, mobile: 20 },
  { month: "April", desktop: 40, mobile: 35 },
  { month: "May", desktop: 38, mobile: 89 },
  { month: "June", desktop: 23, mobile: 34 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "orange",
  },
  mobile: {
    label: "Mobile",
    color: "pink",
  },
} satisfies ChartConfig;

export default function SummaryPage() {
  const [savedHours, setSavedHours] = useState<number>(0);
  const [tooltipMsg, setTooltipMsg] = useState<string>("");
  const [hobbyHours, setHobbyHours] = useState<number>(0);
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
              Zaoszczędziłeś/aś{" "}
              <strong className="text-accent-foreground">12</strong> godzin
              dzięki dobrej organizacji, z czego{" "}
              <strong className="text-accent-foreground">9</strong> godzin
              spędziłeś/aś na swoim hobby. Tak trzymaj!
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2>
              Średnio przez ostatnie pół roku uprawiałeś sport przez{" "}
              <strong className="text-accent-foreground">12 </strong> godzin w
              tygodniu dzięki dobrej organizacji, z czego{" "}
              <strong className="text-accent-foreground">9</strong> godzin
              spędziłeś/aś na aktywności z przyjaciółmi!
            </h2>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center align-center gap-8">
        <Card className="min-w-2xl w-1/2">
          <CardHeader>
            <CardTitle>Wykres zwiększenia wydajności</CardTitle>
            <CardDescription>
              Statystyczna informacja o wzroście wydajności przez okres 6
              miesięcy w porównaniu do zeszłego roku.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData2}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Średnio spełniasz 78% zaplanowanych zobowiązań!{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Styczeń - Czerwiec 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card className="min-w-2xl w-1/2">
          <CardHeader>
            <CardTitle>Wykres spełniania się w swoich hobby</CardTitle>
            <CardDescription>
              Informacja o czasie wykorzystanym na rozwój i zainteresowania w
              porównaniu do zeszłego roku
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="mobile"
                  type="natural"
                  fill="var(--color-mobile)"
                  fillOpacity={0.4}
                  stroke="var(--color-mobile)"
                  stackId="a"
                />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 font-medium leading-none">
                  Średnio dwa razy dziennie starasz się zadbać o swoje pasję czy
                  zainteresowania. Brawo za zdrowę podejście!{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Styczeń - Czerwiec 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
