import { SpreadType } from "@/app/types/SpreadType";
import { Button } from "@/components/ui/button";
import _ from "lodash";
import React from "react";

interface SpreadRowProps {
  spread: SpreadType;
}

const SpreadRow: React.FunctionComponent<SpreadRowProps> = ({
  spread,
}: SpreadRowProps) => {
  const [hoveredRow, setHoveredRow] = React.useState<boolean>(false);

  const attractive = _.times(3, () => Math.random() < 0.5);

  return (
    <ul
      className="flex w-full text-[10px] relative"
      onMouseEnter={() => setHoveredRow(true)}
      onMouseLeave={() => setHoveredRow(false)}
    >
      <li className="flex-1 text-center">{spread.bid}</li>
      <li className="flex-1 text-center">{spread.ask}</li>
      <li className="flex-1 text-center">{spread.quantity}</li>
      <li className="flex-1 text-center">{spread.order}</li>
      <li className="flex-1 text-center">{spread.type}</li>
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
      {hoveredRow && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-background/15 z-10">
          <Button size="sm" onClick={() => alert("Proposition")}>
            Propose
          </Button>
        </div>
      )}
    </ul>
  );
};

export default SpreadRow;
