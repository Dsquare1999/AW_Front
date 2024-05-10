import { BondProp } from "./BondType";

export type PropositionType = {
    accepted_date: string | null;
    created_at: string;
    id : string;
    operation: string;
    proposer: number;
    proposition: string;
    proposition_bond: BondProp;
    status: string;
    updated_at: string;
}

export type SwapType = {
    id: string;
    offer: string;
    offer_bond: BondProp;

    offer_duration: number;
    offer_quantity: number;
    offer_return: number;
    offer_country: number;

    demand_duration: string;
    demand_quantity: number;
    demand_return: number;
    demand_country: number;

    propositions: PropositionType[];
    validity: Date;
    user: number;
}