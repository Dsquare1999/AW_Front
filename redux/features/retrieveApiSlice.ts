import { apiSlice } from "../services/apiSlice";
import { RoomType } from "@/app/types/ChatType";
import { UserType } from "@/app/types/UserType";
import { AdminBondType } from "@/app/types/AdminBondType";
import { BondPortofolioPageProps, BondProp } from "@/app/types/BondType";
import { BilanProps } from "@/app/types/BilanType";
import { PropositionType as SpreadPropositionType, SpreadType } from "@/app/types/SpreadType";
import { PropositionType as SwapPropositionType, SwapType } from "@/app/types/SwapType";

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
        retrieveBondPortofolio: builder.query<BondPortofolioPageProps[], void>({
            query: () => '/bond_portofolio/'
        }),
        retrieveBilan: builder.query<BilanProps[], void>({
            query:() => '/bilan/'
        }),

        // Spread
        retrieveSpreadOperations: builder.query<SpreadType[], void>({
            query:() => '/spread_operations/'
        }),
        retrieveSpreadPropositions: builder.query<SpreadPropositionType[], void>({
            query:() => '/spread_propositions/'
        }),
        // Swap
        retrieveSwapOperations: builder.query<SwapType[], void>({
            query:() => '/swap_operations/'
        }),
        retrieveSwapPropositions: builder.query<SwapPropositionType[], void>({
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
    useRetrieveRoomMessagesQuery,
} = retrieveApiSlice