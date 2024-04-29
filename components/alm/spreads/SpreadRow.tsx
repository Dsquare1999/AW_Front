import { SpreadType } from "@/app/types/SpreadType";

interface SpreadRowProps {
    spread: SpreadType
}
 
const SpreadRow: React.FunctionComponent<SpreadRowProps> = ({spread} : SpreadRowProps) => {
    return ( 
        <ul className="flex w-full text-xs">
            <li className="flex-1 text-center">{spread.bid}</li>
            <li className="flex-1 text-center">{spread.bid}</li>
            <li className="flex-1 text-center">{spread.ask}</li>
            <li className="flex-1 text-center">{spread.quantity}</li>
            <li className="flex-1 text-center">{spread.order}</li>
            <li className="flex-1 text-center">{spread.type}</li>
            <li className="flex-1 text-center">{spread.validity.toString()}</li>
            <li className="flex-1 text-center">{spread.attractive}</li>
        </ul>
     );
}
 
export default SpreadRow;