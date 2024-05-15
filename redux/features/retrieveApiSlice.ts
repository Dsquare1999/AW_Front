import { AdminBondSchema, BondSchema } from "@/schemas";
import { apiSlice } from "../services/apiSlice";
import { RoomType, UserType } from "@/app/types/ChatType";

const retrieveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Me
        retrieveMe: builder.query<UserType, void>({
            query: () => '/auth/me/'
        }),
        // Bond
        retrieveAdminBond : builder.query<typeof BondSchema, void>({
            query: () => '/admin-bonds/'
        }),
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
        // Chat
        retrieveRooms: builder.query<RoomType[], void>({
            query:() => '/rooms/'
        }),
        retrieveRoomMessages: builder.query<any, string>({
            query: (room_id: string) => `/rooms/${room_id}/messages/`,
        }),
    })
})

export const {
    useRetrieveMeQuery,
    useRetrieveAdminBondQuery,
    useRetrieveBondQuery,
    useRetrieveBondPortofolioQuery,
    useRetrieveBilanQuery,
    useRetrieveSpreadOperationsQuery,
    useRetrieveSpreadPropositionsQuery,
    useRetrieveSwapOperationsQuery,
    useRetrieveSwapPropositionsQuery,
    useRetrieveRoomsQuery,
    useRetrieveRoomMessagesQuery
} = retrieveApiSlice