import { AdminBondSchema, BondSchema } from "@/schemas";
import { apiSlice } from "../services/apiSlice";

const retrieveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveBond : builder.query<typeof BondSchema, void>({
            query: () => '/bond/'
        }),
        retrieveBondPortofolio: builder.query<any, void>({
            query: () => '/bond_portofolio/'
        }),
        retrieveBilan: builder.query<any, void>({
            query:() => '/bilan/'
        }),

        // Spread
        retrieveSpreadOperations: builder.query<any, void>({
            query:() => '/spread_operations/'
        }),
        retrieveSpreadPropositions: builder.query<any, void>({
            query:() => '/spread_propositions/'
        }),
        // Swap
        retrieveSwapOperations: builder.query<any, void>({
            query:() => '/swap_operations/'
        }),
        retrieveSwapPropositions: builder.query<any, void>({
            query:() => '/swap_propositions/'
        }),
    })
})

export const {
    useRetrieveBondQuery,
    useRetrieveBondPortofolioQuery,
    useRetrieveBilanQuery,
    useRetrieveSpreadOperationsQuery,
    useRetrieveSpreadPropositionsQuery,
    useRetrieveSwapOperationsQuery,
    useRetrieveSwapPropositionsQuery,
} = retrieveApiSlice