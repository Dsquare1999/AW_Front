import { BondPortofolioPageProps } from "./BondType";

export type BilanProps = {
    bondPortofolios: BondPortofolioPageProps[];
    id: string;
    is_active: boolean;
    is_simulated: boolean;
    user: number;
}