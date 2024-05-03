import { z } from "zod";

const SpreadSchema = z.object({
    admin_bond: z.string().trim().min(2, {
      message: "Bond Isin is required"
    }),
    quantity: z.string().trim().min(1, {
        message: "Quantity is required"
        }),
    validity: z.string().trim().min(1, {
        message: "Validity is required"
        }),
    type: z.string().trim().min(1, {
        message: "Type is required"
        }),
        
});


export default SpreadSchema