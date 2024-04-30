"use client";
import { DurationProp } from "@/app/types/BondType";
import { Line } from "@/components/charts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DurationData } from "@/data/bonds/DurationData";
import { DurationEncoursData } from "@/data/bonds/DurationEncoursData";
import { useState } from "react";

interface DurationViewProps {
  due_date: string;
  value_date: string;
  durations: {
    [date: string]: DurationProp;
  };
}

const DurationView: React.FunctionComponent<DurationViewProps> = ({
  due_date,
  value_date,
  durations,
}) => {
  const [jump, setJump] = useState<string>("30");
  const [from, setFrom] = useState<Date>(new Date());

  const value_date_labels = Object.keys(durations);
  const last_value_date = new Date(
    value_date_labels[value_date_labels.length - 1]
  );

  const [to, setTo] = useState<Date | undefined>(
    new Date(last_value_date.setDate(last_value_date.getDate() + 4))
  );

  const [comparedFrom, setComparedFrom] = useState<Date | undefined>(undefined);
  const [comparedTo, setComparedTo] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h5 className="text-[10px] text-left font-bold">
          Durations & Durations * Outstanding
        </h5>
        <div className="flex space-x-2">
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
      <div className="flex flex-row space-x-2">
          <Card className="w-[240px]">
            <CardHeader className="p-2">
              <CardDescription className="text-xs">Duration</CardDescription>
              <div className="flex justify-between items-center">
              <CardTitle className="text-md">
                $
                {DurationEncoursData(durations, from, to, jump)
                  .datasets[0].data.reduce((acc, curr) => acc + curr, 0)
                  .toFixed(2)}
              </CardTitle>
              <p className="text-[9px] text-muted-foreground">
                {to !== undefined &&
                to.toLocaleDateString() !== from.toLocaleDateString()
                  ? ` ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`
                  : ` ${from.toLocaleDateString()}`}
              </p>
              </div>
              
            </CardHeader>
            <CardContent className="p-2">
              
              {DurationData(durations, from, to, jump).datasets[0].data.reduce(
                (acc, curr) => acc + curr,
                0
              ) > 0 && (
                <div className="w-full flex flex-col space-y-2">
                  {comparedFrom !== undefined && comparedTo !== undefined && (
                    <div className="w-full">
                      <Line
                        data={DurationData(
                          durations,
                          comparedFrom,
                          comparedTo,
                          jump
                        )}
                        title={`Bond Valorisation Drops Comparison: ${comparedFrom.toDateString()} - ${comparedTo.toDateString()}`}
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <Line
                      data={DurationData(durations, from, to, jump)}
                      title={`Bond Duration : ${from.toDateString()} ${
                        to !== undefined &&
                        to.toLocaleDateString() !== from.toLocaleDateString()
                          ? " - " + to.toDateString()
                          : ""
                      }`}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="w-[240px]">
            <CardHeader className="p-2">
              <CardDescription className="text-xs">
                Duration * Outstanding
              </CardDescription>              
              <div className="flex justify-between items-center">
              <CardTitle className="text-md">
                $
                {DurationEncoursData(durations, from, to, jump)
                  .datasets[0].data.reduce((acc, curr) => acc + curr, 0)
                  .toFixed(2)}
              </CardTitle>
              <p className="text-[9px] text-muted-foreground">
                {to !== undefined &&
                to.toLocaleDateString() !== from.toLocaleDateString()
                  ? ` ${from.toLocaleDateString()} - ${to.toLocaleDateString()}`
                  : ` ${from.toLocaleDateString()}`}
              </p>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              {DurationEncoursData(
                durations,
                from,
                to,
                jump
              ).datasets[0].data.reduce((acc, curr) => acc + curr, 0) > 0 && (
                <div className="w-full flex flex-col space-y-2">
                  {comparedFrom !== undefined && comparedTo !== undefined && (
                    <div className="w-full">
                      <Line
                        data={DurationEncoursData(
                          durations,
                          comparedFrom,
                          comparedTo,
                          jump
                        )}
                        title={`Bond Duration Outstanding Comparison: ${comparedFrom.toDateString()} - ${comparedTo.toDateString()}`}
                      />
                    </div>
                  )}
                  <div className="w-full">
                    <Line
                      data={DurationEncoursData(durations, from, to, jump)}
                      title={`Bond Duration Encours : ${from.toDateString()} ${
                        to !== undefined &&
                        to.toLocaleDateString() !== from.toLocaleDateString()
                          ? " - " + to.toDateString()
                          : ""
                      }`}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
      </div>
    </div>
  );
};

export default DurationView;
