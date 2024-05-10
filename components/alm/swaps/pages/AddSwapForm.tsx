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
import { AiOutlinePercentage } from "react-icons/ai";
import { PiSwap } from "react-icons/pi";

import { Input } from "@/components/ui/input";
import { SwapSchema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { BondProp } from "@/app/types/BondType";
import AfricanCountries from "@/utils/AfricanCountries";
import Image from "next/image";

import { useCreateSwapMutation } from "@/redux/features/createApiSlice";
import { toast } from "react-toastify";

interface AddSwapFormProps {
  myBonds: BondProp[];
}
const AddSwapForm = ({ myBonds }: AddSwapFormProps) => {
  const [createSwap, { isLoading }] = useCreateSwapMutation();
  const form = useForm<z.infer<typeof SwapSchema>>({
    resolver: zodResolver(SwapSchema),
  });

  const onSubmit = (values: any) => {
    createSwap(values)
      .unwrap()
      .then((data) => {
        toast.success("Swap offer created");
      })
      .catch((error) => {
        console.log("Swap error : ", error)
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="w-full flex space-x-4 border rounded p-2">
          <div className="w-full flex flex-col space-y-2 rounded">
            <h5 className="text-[10px] font-bold text-center bg-algoMarron text-white p-2 rounded flex justify-center items-center">
              Offer <IoMdArrowDropupCircle className="h-4 w-4 ml-2" />
            </h5>

            <FormField
              control={form.control}
              name="offer_duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.001"
                      min={0}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      disabled={isLoading}
                      placeholder="Duration"
                      className="text-[10px]"
                    />
                  </FormControl>
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
                    <div className="flex items-center space-x-0">
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min={0}
                        max={100}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={isLoading}
                        placeholder="Return"
                        className="text-[10px] border-r-0"
                      />
                      <span className="p-2 border border-input rounded-md w-auto h-9 flex items-center justify-center ">
                        <AiOutlinePercentage />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="offer_country"
              render={({ field }) => (
                <FormItem className="text-[10px] w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-[10px]">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AfricanCountries.map((africanCountry, index) => (
                        <SelectItem
                          key={index}
                          className="text-[10px] "
                          value={africanCountry.code}
                        >
                          <span className="flex items-center">
                            <Image
                              src={`/assets/image/flags/${africanCountry.camelCase}.png`}
                              width={20}
                              height={20}
                              alt={africanCountry.name}
                              className="mr-2"
                            />
                            {africanCountry.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              name="offer"
              render={({ field }) => (
                <FormItem className="text-[10px] w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-[10px]">
                        <SelectValue placeholder="Isin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {myBonds.map((bond) => (
                        <SelectItem
                          key={bond.isin}
                          className="text-[10px]"
                          value={bond.id}
                        >
                          {bond.admin_bond.isin}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col space-y-2 rounded">
            <h5 className="text-[10px] font-bold text-center bg-algoOrange text-white p-2 rounded  flex justify-center items-center">
              Demand <IoMdArrowDropdownCircle className="h-4 w-4 ml-2" />
            </h5>
            <FormField
              control={form.control}
              name="demand_duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.001"
                      min={0}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      disabled={isLoading}
                      placeholder="Duration"
                      className="text-[10px]"
                    />
                  </FormControl>
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
                    <div className="flex items-center space-x-0">
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        min={0}
                        max={100}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                        disabled={isLoading}
                        placeholder="Return"
                        className="text-[10px] border-r-0"
                      />
                      <span className="p-2 border border-input rounded-md w-auto h-9 flex items-center justify-center ">
                        <AiOutlinePercentage />
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="demand_country"
              render={({ field }) => (
                <FormItem className="text-[10px] w-full">
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-[10px]">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AfricanCountries.map((africanCountry, index) => (
                        <SelectItem
                          key={index}
                          className="text-[10px] "
                          value={africanCountry.code}
                        >
                          <span className="flex items-center">
                            <Image
                              src={`/assets/image/flags/${africanCountry.camelCase}.png`}
                              width={20}
                              height={20}
                              alt={africanCountry.name}
                              className="mr-2"
                            />
                            {africanCountry.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
