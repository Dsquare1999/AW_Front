import { apiSlice } from "../services/apiSlice";
import { RoomType } from "@/app/types/ChatType";
import { RoomType as GPTRoomType } from "@/app/types/GPTType";
import { UserType } from "@/app/types/UserType";
import { AdminBondType } from "@/app/types/AdminBondType";
import { BondProp } from "@/app/types/BondType";

const retrieveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // Me
        retrieveMe: builder.query<UserType, void>({
            query: () => '/auth/me/'
        }),
        // Bond
        retrieveAdminBond : builder.query<AdminBondType[], void>({
            query: () => '/admin-bonds/'
        }),
        retrieveBond : builder.query<BondProp[], void>({
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
        // GPT 
        retrieveGPTRooms: builder.query<GPTRoomType[], void>({
            query:() => '/gpt-rooms/'
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
    useRetrieveRoomMessagesQuery,
    useRetrieveGPTRoomsQuery
} = retrieveApiSlice