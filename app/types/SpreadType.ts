import { AdminBondType } from "./AdminBondType";

export type PropositionType = {
    accepted_date: string | null;
    confirmation : boolean;
    confirmation_date: string | null;
    id : string;
    operation: string;
    price: number;
    proposer: 1;
    status: string;
    volume: number;
}

export type SpreadType = {
    id: string;
    admin_bond: AdminBondType;
    bid: number;
    ask: number;
    adviced_bid: number;
    adviced_ask: number;
    description: string;
    propositions: PropositionType[];
    spread: number;
    quantity: number;
    order: number;
    type: string;
    validity: Date;
    user: number;
}