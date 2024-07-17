import { SpreadSchema, SwapSchema, BondPortofolioSchema, SwitchBondPortofolioSchema } from "@/schemas";
import { z } from "zod";
import { apiSlice } from "../services/apiSlice";

const createApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSpread: builder.mutation({
      query: ({
        admin_bond,
        ask,
        bid,
        spread,
        order,
        quantity,
        type,
        validity,
      }: z.infer<typeof SpreadSchema>) => ({
        url: "/spread_operations/",
        method: "POST",
        body: { admin_bond, ask, bid, spread, order, quantity, type, validity },
      }),
    }),
    createSwap: builder.mutation({
      query: ({
        offer,
        offer_duration,
        offer_quantity,
        offer_return,
        offer_country,
        demand_duration,
        demand_quantity,
        demand_return,
        demand_country,
      }: z.infer<typeof SwapSchema>) => ({
        url: "/swap_operations/",
        method: "POST",
        body: { offer, offer_duration, offer_quantity, offer_return, offer_country, demand_duration, demand_quantity, demand_return, demand_country},
      }),
    }),
    createBondPortofolio: builder.mutation({
      query: ({
        name,
        is_simulated,
        start,
      }: z.infer<typeof BondPortofolioSchema>) => ({
        url: "/bond_portofolio/",
        method: "POST",
        body: { name, is_simulated, start },
      }),
    }),
    switchBondPortofolio: builder.mutation({
      query: ({
        portofolio,
      }: z.infer<typeof SwitchBondPortofolioSchema>) => ({
        url: `/bond_portofolio/${portofolio}/switch/`,
        method: "POST",
      }),
    }),
  }),
});

export const { 
	useCreateSpreadMutation, 
	useCreateSwapMutation, 
  useCreateBondPortofolioMutation,
  useSwitchBondPortofolioMutation,
} = createApiSlice;
