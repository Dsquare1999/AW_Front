import { z } from "zod";

const BondPortofolioSchema = z.object({
  name: z.string().min(2, {
    message: "Portofolio name must be at least 2 characters.",
  }),
  is_simulated: z.boolean().optional(),
  start: z.enum(["0", "1"]).optional(),
});

export const SwitchBondPortofolioSchema = z.object({
  portofolio: z.string().min(2, {
    message: "Portofolio name must be at least 2 characters.",
  }),
});

export default BondPortofolioSchema