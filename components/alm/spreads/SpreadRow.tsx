import { SpreadType } from "@/app/types/SpreadType";
import _ from 'lodash';

interface SpreadRowProps {
  spread: SpreadType;
}

const SpreadRow: React.FunctionComponent<SpreadRowProps> = ({
  spread,
}: SpreadRowProps) => {

    const attractive = _.times(3, () => Math.random() < 0.5);

  return (
    <ul className="flex w-full text-[10px]">
      <li className="flex-1 text-center">{spread.bid}</li>
      <li className="flex-1 text-center">{spread.ask}</li>
      <li className="flex-1 text-center">{spread.quantity}</li>
      <li className="flex-1 text-center">{spread.order}</li>
      <li className="flex-1 text-center">{spread.type}</li>
      {/* <li className="flex-1 text-center">{spread.validity.toString()}</li> */}
      <li className="flex-1 text-center">
        <ul className="flex items-center justify-center">
          {attractive.map((attractiveDay, index) => (
            <li
              className={`${attractiveDay ? "bg-algoOrange" : "bg-algoMarron"}`}
              style={{ width: "10px", height: "10px", margin: "2px" }}
              key={index}
            ></li>
          ))}
        </ul>
      </li>
    </ul>
  );
};

export default SpreadRow;
