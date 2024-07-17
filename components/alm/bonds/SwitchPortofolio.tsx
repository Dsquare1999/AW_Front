import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
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
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { BondPortofolioPageProps } from "@/app/types/BondType";
import { SwitchBondPortofolioSchema } from "@/schemas";
import { useSwitchBondPortofolioMutation } from "@/redux/features/createApiSlice";

interface SwitchPortofolioProps {
  portofolios: BondPortofolioPageProps[];
}

const SwitchPortofolio = ({ portofolios } : SwitchPortofolioProps) => {
  const form = useForm<z.infer<typeof SwitchBondPortofolioSchema>>({
    resolver: zodResolver(SwitchBondPortofolioSchema),
  });
  const [switchBondPortofolio, { isLoading }] = useSwitchBondPortofolioMutation();

  function onSubmit(data: z.infer<typeof SwitchBondPortofolioSchema>) {
    switchBondPortofolio(data)
      .unwrap()
      .then((data) => {
        toast.success('Bond Portofolio Switched');
        console.log("switch bond portofolio", data);
      })
      .catch((error) => {
        toast.error('Something went wrong ...');
        console.log("switch bond portofolio", error);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2 flex justify-center items-center">
        <FormField
          control={form.control}
          name="portofolio"
          render={({ field }) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a portofolio" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    portofolios.filter(portofolio => !portofolio.is_active).map((portofolio) => (
                      <SelectItem key={portofolio.id} value={portofolio.id}>{portofolio.name}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="">Switch</Button>
      </form>
    </Form>
  );
};

export default SwitchPortofolio;
