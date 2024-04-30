import { BondProp } from "@/app/types/BondType";

interface BondRowProps {
    bond: BondProp
}
 
const BondRow: React.FunctionComponent<BondRowProps> = ({bond} : BondRowProps) => {
    return ( 
        <ul className="flex justify-between w-full text-[10px]">
            <li className="flex-1 text-center">{bond.outstanding}</li>
            <li className="flex-1 text-center">{bond.value_date}</li>
            <li className="flex-1 text-center">{bond.due_date}</li>
            <li className="flex-1 text-center">{bond.facial_rate}</li>
            <li className="flex-1 text-center">{bond.refund}</li>
            <li className="flex-1 text-center">{bond.period}</li>
            <li className="flex-1 text-center">{bond.type}</li>

        </ul>
     );
}
 
export default BondRow;