import { addDays, format } from "date-fns";
import { z } from "zod";

const SpreadSchema = z.object({
  admin_bond: z.string().trim().min(2, {
    message: "Bond Isin is required",
  }),
  quantity: z.number().int().min(1, {
    message: "Quantity is required",
  }),
  validity: z.string().min(1, {
    message: "Validity is required",
  }),
  type: z.enum(["B", "S"]), 
  order: z.enum(["MinVol", "VolAvail", "AllNone", "Complex"]), 
  bid: z.number().min(1, {
    message: "Bid is required",
  }),
  ask: z.number().min(1, {
    message: "Ask is required",
  }),
  spread: z.number().min(1, {
    message: "Spread is required",
  }),
});

const daysToAddMap = {
  "1": 1,
  "3": 3,
  "5": 5,
  "7": 7,
};

export const calculateExpirationDate = (selectedValue: string) => {
  const daysToAdd = daysToAddMap[selectedValue as keyof typeof daysToAddMap];
  const currentDate = new Date();
  const expirationDate = addDays(currentDate, daysToAdd); 
  const formattedExpirationDate = format(expirationDate, 'yyyy-MM-dd');
  return formattedExpirationDate;
};
export default SpreadSchema 