export type SpreadType = {
    
    bid: number;
    ask: number;
    adviced_bid: number;
    adviced_ask: number;
    spread: number;
    quantity: number;
    order: number;
    type: string;
    validity: Date;
    attractive: boolean[];
}