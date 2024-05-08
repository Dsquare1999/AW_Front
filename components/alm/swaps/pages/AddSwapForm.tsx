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

import { IoMdArrowDropupCircle } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { PiSwap } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import { SwapSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const AddSwapForm = () => {
  const isLoading = false;
  const form = useForm<z.infer<typeof SwapSchema>>({
    resolver: zodResolver(SwapSchema),
  });

  const onSubmit = (values: any) => {
    // Submit swap
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex space-x-4 border rounded p-2">
          
          <div className="w-full flex flex-col space-y-2 rounded">
            <h5 className="text-[10px] font-bold text-center bg-algoMarron text-white p-2 rounded flex justify-center items-center">Offer <IoMdArrowDropupCircle  className="h-4 w-4 ml-2"/></h5>
            
            <FormField
              control={form.control}
              name="offer_duration"
              render={({ field }) => (
                <FormItem className="text-[10px] w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-[10px]">
                        <SelectValue placeholder="Duration" />
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
            <FormField
              control={form.control}
              name="offer_return"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={isLoading}
                      placeholder="Return"
                      className="text-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer_country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={isLoading}
                      placeholder="Country"
                      className="text-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
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
              name="offer_isin"
              render={({ field }) => (
                <FormItem className="text-[10px] w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-[10px]">
                        <SelectValue placeholder="Isin" />
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
          
          <div className="w-full flex flex-col space-y-2 rounded">
            <h5 className="text-[10px] font-bold text-center bg-algoOrange text-white p-2 rounded  flex justify-center items-center">Demand <IoMdArrowDropdownCircle className="h-4 w-4 ml-2"/></h5>
            <FormField
              control={form.control}
              name="demand_duration"
              render={({ field }) => (
                <FormItem className="text-[10px] w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-[10px]">
                        <SelectValue placeholder="Duration" />
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
            <FormField
              control={form.control}
              name="demand_return"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={isLoading}
                      placeholder="Return"
                      className="text-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demand_country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={isLoading}
                      placeholder="Country"
                      className="text-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demand_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                      disabled={isLoading}
                      placeholder="Quantity"
                      className="text-[10px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Add
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddSwapForm;
