"use client";
import { ValorisationProp } from "@/app/types/BondType";
import { Line } from "@/components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EconomicValuesData } from "@/data/bonds/EconomicValuesData";
import { useState } from "react";

interface EconomicValueViewProps {
  due_date: string;
  value_date: string;
  economicValues: {
    [date: string]: ValorisationProp;
  };
}

const EconomicValueView: React.FunctionComponent<EconomicValueViewProps> = ({
  due_date,
  value_date,
  economicValues,
}) => {
  const [jump, setJump] = useState<string>("30");
  const [from, setFrom] = useState<Date>(new Date());

  const value_date_labels = Object.keys(economicValues);
  const last_value_date = new Date(
    value_date_labels[value_date_labels.length - 1]
  );

  const [to, setTo] = useState<Date | undefined>(
    new Date(last_value_date.setDate(last_value_date.getDate() + 4))
  );

  const [comparedFrom, setComparedFrom] = useState<Date | undefined>(undefined);
  const [comparedTo, setComparedTo] = useState<Date | undefined>(undefined);

  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-[10px] text-left font-bold flex-1">Economic Values</h5>
        <div className=" flex flex-1 space-x-2">
          <DateRangePicker
            onUpdate={(values) => {
              console.log("Values", values);
              setFrom(values.range.from);
              setTo(values.range.to);
              setComparedFrom(values.rangeCompare?.from);
              setComparedTo(values.rangeCompare?.to);
            }}
            initialDateFrom={new Date(value_date)}
            initialDateTo={to}
            align="start"
            locale="en-GB"
            showCompare={true}
          />

          <Select onValueChange={(value) => setJump(value)} defaultValue="30">
            <SelectTrigger>
              <SelectValue placeholder="Monthly Display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="360">Yearly</SelectItem>
              <SelectItem value="180">Half-yearly</SelectItem>
              <SelectItem value="90">Quaterly</SelectItem>
              <SelectItem value="30">Monthly</SelectItem>
              <SelectItem value="7">Weekly</SelectItem>
              <SelectItem value="1">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full"
      >
        <CarouselContent className="h-[275px]">
          <CarouselItem className="flex flex-col space-y-4">
            <div className="flex space-x-4">
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardDescription className="text-xs">
                    +100 bps
                  </CardDescription>
                  <CardTitle className="text-md">$1,329</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardDescription className="text-xs">
                    -100 bps
                  </CardDescription>
                  <CardTitle className="text-md">$1,329</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardDescription className="text-xs">
                    Steepening Shock
                  </CardDescription>
                  <CardTitle className="text-md">$1,329</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex space-x-4">
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardDescription className="text-xs">
                    Flatenning Shock
                  </CardDescription>
                  <CardTitle className="text-md">$1,329</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardDescription className="text-xs">
                    Short rates shock up
                  </CardDescription>
                  <CardTitle className="text-md">$1,329</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="p-2">
                  <CardDescription className="text-xs">
                    Short rates shock down
                  </CardDescription>
                  <CardTitle className="text-md">$1,329</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="w-full flex justify-center items-center">
              <Line
                data={EconomicValuesData(economicValues, from, to, jump)}
                title={`Bond Valorisation Drops: ${from.toDateString()} ${
                  to !== undefined &&
                  to.toLocaleDateString() !== from.toLocaleDateString()
                    ? " - " + to.toDateString()
                    : ""
                }`}
                labelPosition="right"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="-top-12 left-1/4" />
        <CarouselNext className="-top-12 left-1/3" />
      </Carousel>
    </div>
  );
};

export default EconomicValueView;
