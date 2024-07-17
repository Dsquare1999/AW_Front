import { BondSchema, AdminBondSchema } from "@/schemas";
import { AdminBondType } from "@/app/types/AdminBondType";
import { BondProp } from "@/app/types/BondType";
import BondFields from "@/data/fields/bondFields";
import { AdminBondFields } from "@/data/fields/AdminBondFields";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRetrieveAdminBondQuery } from "@/redux/features/retrieveApiSlice";
import {
  useBondMutation,
  useBackofficeMutation,
} from "@/redux/features/uploadApiSlice";
import { toast } from "react-toastify";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type endpointProps = "backoffice" | "bond" | "customer_loan" | "eib" | "pib" | "dat" | "refi" | "op_injection" | "op_retrait";

interface AddBondManuallyProps {
  endpoint?: endpointProps;
  isAdmin: boolean;
}


const AddBondManually = ({ endpoint, isAdmin }: AddBondManuallyProps) => {

  const getChoosenFields = (endpoint: endpointProps | undefined) => {
    if (endpoint === "bond") {
      return BondFields;
    } else {
      return AdminBondFields;
    }
  };

  const getChoosenSchema = (endpoint: endpointProps | undefined) => {
    if (endpoint === "bond") {
      return BondSchema;
    } else {
      return AdminBondSchema;
    }
  };

  const choosenFields = getChoosenFields(endpoint);
  const choosenSchema = getChoosenSchema(endpoint);
  
  const [bond] = useBondMutation();
  const [backoffice] = useBackofficeMutation();
  const { data: adminBonds } = useRetrieveAdminBondQuery();

  const uploadBond = async (row: z.infer<typeof BondSchema>) => {
    try {
      await bond(row).unwrap();
      toast.success("Bond Successful Upload");
    } catch {
      toast.error("Error Uploading Bond");
    }
  };
  
  // Fonction pour Backoffice
  const uploadBackoffice = async (row: z.infer<typeof AdminBondSchema>) => {
    try {
      await backoffice(row).unwrap();
      toast.success("Admin Bond Successful Upload");
    } catch {
      toast.error("Error Uploading Admin Bond");
    }
  };

  const upload = async (endpoint: endpointProps | undefined, row: z.infer<typeof choosenSchema>) => {
    if (endpoint === "bond") {
      await uploadBond(row as z.infer<typeof BondSchema>);
    } else {
      await uploadBackoffice(row as z.infer<typeof AdminBondSchema>);
    }
  };

  const form = useForm<z.infer<typeof choosenSchema>>({
    resolver: zodResolver(choosenSchema),
  });

  const onAddBondSubmit = (values: z.infer<typeof choosenSchema>) => {
    console.log("Form Values", values);
    upload(endpoint, values);
  };

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAddBondSubmit)} className="">
          <Separator className="my-2" />
          <ScrollArea className="whitespace-nowrap h-[80vh] text-xs">
            <div className="p-2 flex flex-col space-y-4">
            {choosenFields.map((bond, bondIndex) =>
              bond.type === "select" && bond.options ? (
                <div className="relative my-2" key={bondIndex}>
                  <select
                    {...form.register(bond.name)}
                    name={bond.name}
                    id={bond.name}
                    className="block appearance-none w-full bg-background border hover:border-gray-400 px-2 py-2 pr-8 rounded shadow leading-tight  "
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select {bond.name}
                    </option>
                    {bond.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414zM5 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ) : bond.type === "bond" && bond.options ? (
                <div className="relative" key={bondIndex}>
                  <select
                    {...form.register(bond.name)}
                    name={bond.name}
                    id={bond.name}
                    className="block appearance-none w-full min-w-[100px] bg-background border border-gray-300 hover:border-gray-400 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:border-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select {bond.name}
                    </option>
                    {adminBonds
                      ? adminBonds.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.isin}
                          </option>
                        ))
                      : null}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414zM5 4a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ) : bond.type === "number" ? (
                <FormField
                  key={bondIndex}
                  control={form.control}
                  name={bond.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type={bond.type}
                          min={bond.min}
                          placeholder={bond.placeholder}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  key={bondIndex}
                  control={form.control}
                  name={bond.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type={bond.type}
                          placeholder={bond.placeholder}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}
            
            </div>
          </ScrollArea>
          <Separator className="my-2" />
          <Button size="sm" type="submit" className="table ml-auto">Add Bond</Button>
        </form>
      </Form>
  );
};

export default AddBondManually;
