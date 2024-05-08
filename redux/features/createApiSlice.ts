import { SpreadSchema } from "@/schemas";
import { z } from "zod";
import { apiSlice } from "../services/apiSlice";


const createApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createSpread: builder.mutation({
			query: ({ admin_bond, ask, bid, spread, order, quantity, type, validity } : z.infer<typeof SpreadSchema>) => ({
				url: '/spread_operations/',
				method: 'POST',
				body: { admin_bond, ask, bid, spread, order, quantity, type, validity },
			}),
		}),
    }),
});

export const { useCreateSpreadMutation } = createApiSlice;