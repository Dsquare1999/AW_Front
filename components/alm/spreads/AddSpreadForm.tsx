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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CountrySelected } from "./africa";

import * as Slider from "@radix-ui/react-slider";
import { SpreadSchema } from "@/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";

interface AddSpreadFormProps {
  countrySelected: string;
}

const AddSpreadForm: React.FC<AddSpreadFormProps> = ({ countrySelected }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOperation, setSelectedOperation] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");

  const form = useForm<z.infer<typeof SpreadSchema>>({
    resolver: zodResolver(SpreadSchema),
  });

  return (
    <div>
      <Form {...form}>
        <div className="">
          <div className="border-b border-gray-900/10 pb-2">
            <div className="flex flex-col gap-y-4">
              <div className="w-full flex items-center">
                {countrySelected === "" ? (
                  ""
                ) : (
                  <CountrySelected country={countrySelected} />
                )}
                <FormField
                  control={form.control}
                  name="admin_bond"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <div className="w-full flex justify-evenly items-center">
                  <div className="flex items-center justify-center cursor-pointer">
                    <input
                      type="radio"
                      id="buy"
                      value="Buy"
                      checked={selectedOperation === "Buy"}
                    />
                    <label htmlFor="buy">Buy</label>
                  </div>
                  <div className="flex items-center justify-center cursor-pointer">
                    <input
                      type="radio"
                      id="sell"
                      value="Sell"
                      checked={selectedOperation === "Sell"}
                    />
                    <label htmlFor="sell">Sell</label>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full flex flex-wrap items-center">
                  <div className="flex items-center justify-center cursor-pointer w-[50%]">
                    <input
                      type="radio"
                      id="minimum-volume-order"
                      value="MinVol"
                      checked={selectedType === "MinVol"}
                    />
                    <label htmlFor="minimum-volume-order">
                      Minimum Volume Order
                    </label>
                  </div>
                  <div className="flex items-center justify-center cursor-pointer  w-[50%]">
                    <input
                      type="radio"
                      id="all-or-none-order"
                      value="AllNone"
                      checked={selectedType === "AllNone"}
                    />
                    <label htmlFor="all-or-none-order">All or None Order</label>
                  </div>
                  <div className="flex items-center justify-center cursor-pointer  w-[50%]">
                    <input
                      type="radio"
                      id="volume-available-order"
                      value="VolAvail"
                      checked={selectedType === "VolAvail"}
                    />
                    <label htmlFor="volume-available-order">
                      Volume Available Order
                    </label>
                  </div>
                  <div className="flex items-center justify-center cursor-pointer  w-[50%]">
                    <input
                      type="radio"
                      id="complex-order"
                      value="ComplexOrder"
                      checked={selectedType === "ComplexOrder"}
                    />
                    <label htmlFor="complex-order">Complex Order</label>
                  </div>

                  <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Notify me about...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="all" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      All new messages
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Direct messages and mentions
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Nothing</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                </div>
              </div>
              <div className="flex justify-between items-center gap-2 text-xs">
              <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            placeholder="123456"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                <FormField
                    control={form.control}
                    name="validity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isLoading}
                            placeholder="123456"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <Slider.Root defaultValue={[50]} step={10}>
                <Slider.Track>
                  <Slider.Range />
                </Slider.Track>
                <Slider.Thumb />
              </Slider.Root>
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end pr-2">
          <Button disabled={isLoading} type="submit">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddSpreadForm;
