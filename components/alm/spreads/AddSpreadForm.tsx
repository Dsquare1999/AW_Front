"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CountrySelected } from "./africa";

import { Slider } from "@/components/ui/slider-range";
import { SpreadSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { calculateExpirationDate } from "@/schemas/SpreadSchema";

import { useCreateSpreadMutation } from "@/redux/features/createApiSlice";
import { spread } from "lodash";
import { toast } from "react-toastify";
import { useRetrieveAdminBondQuery } from "@/redux/features/retrieveApiSlice";

interface AddSpreadFormProps {
  countrySelected: string;
}

const AddSpreadForm: React.FC<AddSpreadFormProps> = ({ countrySelected }) => {
  const [createSpread, { isLoading }] = useCreateSpreadMutation();
  
  const {
    data: adminBonds
  } = useRetrieveAdminBondQuery();


  const [localValues, setLocalValues] = useState([0, 100_000]);
  const form = useForm<z.infer<typeof SpreadSchema>>({
    resolver: zodResolver(SpreadSchema),
    defaultValues: {
      bid: 10000,
      ask: 30000,
      spread: 20000,
    }
  });

  const handleValueChange = (newValues: number[]) => {
    const updatedValues = {
      ...form.getValues(),
      bid: newValues[0],
      ask: newValues[1],
      spread: newValues[1] - newValues[0],
    };
    form.reset(updatedValues);
    setLocalValues(newValues);
  };

  const onSubmit = (values: any) => {
    createSpread(values)
      .unwrap()
      .then((data) => {
        toast.success('Spread Created');
      })
      .catch((error) => {
        toast.error('Something went wrong ...');
      });
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <div className="">
              <div className="flex flex-col gap-y-4">
                <div className="w-full flex items-center">
                  {countrySelected === "" ? (
                    ""
                  ) : (
                    <div className="w-8">
                      <CountrySelected country={countrySelected} />
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="admin_bond"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <Select
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="text-[10px]">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {adminBonds ? adminBonds.map((bond) => (
                              <SelectItem
                                className="text-[10px]"
                                key={bond.id}
                                value={bond.id}
                              >
                                {bond.isin}
                              </SelectItem>
                            )) : <div className="text-[10px] text-center">No admin Bond Found !</div>}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-center space-x-4">
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              min={1}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              disabled={isLoading}
                              placeholder="Quantity"
                              className="text-[10px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex justify-center items-center space-x-2"
                            >
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="B" />
                                </FormControl>
                                <FormLabel className="font-normal text-[10px] cursor-pointer">
                                  Buy
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="S" />
                                </FormControl>
                                <FormLabel className="font-normal text-[10px] cursor-pointer">
                                  Sell
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full flex space-x-2">
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem className="text-[10px] w-full">
                        <Select
                          onValueChange={field.onChange}
                          
                        >
                          <FormControl>
                            <SelectTrigger className="text-[10px]">
                              <SelectValue placeholder="Order" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem
                              className="text-[10px]"
                              value={"MinVol"}
                            >
                              Minimum Volume Order
                            </SelectItem>
                            <SelectItem
                              className="text-[10px]"
                              value={"AllNone"}
                            >
                              All or None Order
                            </SelectItem>
                            <SelectItem
                              className="text-[10px]"
                              value={"VolAvail"}
                            >
                              Volume Available Order
                            </SelectItem>
                            <SelectItem
                              className="text-[10px]"
                              value={"Complex"}
                            >
                              Complex Order
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="validity"
                    render={({ field }) => (
                      <FormItem className="text-[10px] w-full">
                        <Select
                          onValueChange={async (value) => {
                            const expirationDate = await calculateExpirationDate(value);
                            form.setValue("validity", expirationDate);
                          }}
                          
                        >
                          <FormControl>
                            <SelectTrigger className="text-[10px]">
                              <SelectValue placeholder="Validity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem className="text-[10px]" value={"1"}>
                              01 day
                            </SelectItem>
                            <SelectItem className="text-[10px]" value={"3"}>
                              03 days
                            </SelectItem>
                            <SelectItem className="text-[10px]" value={"5"}>
                              05 days
                            </SelectItem>
                            <SelectItem className="text-[10px]" value={"7"}>
                              07 days
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 p-4 w-full rounded-[12px]">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Price Range
                    </label>
                    <aside className="flex items-center justify-center space-x-2">
                      {localValues.map((_, index) => (
                        <span key={index} className="text-[10px]">
                          ${localValues[index]}
                        </span>
                      ))}
                    </aside>
                  </div>
                  <Slider
                    defaultValue={[10_000, 30_000]}
                    minStepsBetweenThumbs={1_000}
                    max={100_000}
                    min={1}
                    step={1}
                    onValueChange={handleValueChange}
                    className={cn("w-full cursor-pointer")}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-end pr-2">
            <Button disabled={isLoading} type="submit">
              Add
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddSpreadForm;
