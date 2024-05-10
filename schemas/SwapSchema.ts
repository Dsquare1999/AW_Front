import { z } from "zod";

const SwapSchema = z.object({
  offer: z.string().trim().min(1, { message: "Offer Isin is required" }),
  offer_duration: z
    .number()
    .min(1, { message: "Offer Duration is required" }),
  offer_quantity: z
    .number()
    .int()
    .min(1, { message: "Offer Quantity is required" }),
  offer_return: z.number().min(1, { message: "Offer Return is required" }),
  offer_country: z
    .string()
    .trim()
    .min(1, { message: "Offer Country is required" }),

  demand_duration: z
    .number()
    .min(1, { message: "Demand Duration is required" }),
  demand_quantity: z
    .number()
    .int()
    .min(1, { message: "Demand Quantity is required" }),
  demand_return: z.number().min(1, { message: "Demand Return is required" }),
  demand_country: z
    .string()
    .trim()
    .min(1, { message: "Demand Country is required" }),
});

export default SwapSchema;
