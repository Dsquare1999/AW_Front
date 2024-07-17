import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { Controller } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox"

import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { BondPortofolioPageProps } from "@/app/types/BondType";
import { useState } from "react";
import { BondPortofolioSchema } from "@/schemas";
import { useCreateBondPortofolioMutation } from "@/redux/features/createApiSlice";

interface AddPortofolioProps {
  portofolios: BondPortofolioPageProps[];
}

const AddPortofolio = ({ portofolios } : AddPortofolioProps) => {
  const form = useForm<z.infer<typeof BondPortofolioSchema>>({
    resolver: zodResolver(BondPortofolioSchema),
  });

  const [isSimulation, setIsSimulation] = useState<boolean>(false);
  const [createBondPortofolio, { isLoading }] = useCreateBondPortofolioMutation();

  function onSubmit(data: z.infer<typeof BondPortofolioSchema>) {
    createBondPortofolio(data)
      .unwrap()
      .then((data) => {
        toast.success('Bond Portofolio Created');
      })
      .catch((error) => {
        toast.error('Something went wrong ...');
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 flex flex-col">
        <div className="flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} className="text-xs" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-x-2 flex items-center">
          <Controller
            name="is_simulated"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="is_simulated"
                checked={field.value}
                onCheckedChange={(checked) => {
                  const isChecked = checked === true;
                  field.onChange(isChecked);
                  setIsSimulation(isChecked);
                }}

              />
            )}
          />
          <label
            htmlFor="is_simulated"
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Simulation
          </label>
        </div>
          {isSimulation && (
            <div>
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Start from</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="text-xs">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0" className="text-xs">Blank</SelectItem>
                        <SelectItem value="1" className="text-xs">Actual Portofolio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
        <Button type="submit" size="sm" className="ml-auto">Add</Button>
      </form>
    </Form>
  );
};

export default AddPortofolio;
