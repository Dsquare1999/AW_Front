import { SwapType } from "@/app/types/SwapType";
import { Button } from "@/components/ui/button";

interface SwapRowsProps {
  swap: SwapType;
}

const SwapRow = ({swap} : SwapRowsProps) => {
  return (
    <div className="flex space-x-4">
      <div className="w-full flex flex-col space-y-2 rounded border p-2">
        <h5 className="text-[10px] font-bold text-left h-8 flex items-center" title="Offer Bond Isin">{swap.offer_bond.admin_bond.isin}</h5>
        <div className="flex space-x-2 text-[10px]">
          <span title="Offer Quantity">{swap.offer_quantity}</span>
          <span title="Offer Return">{swap.offer_return}%</span>
          <span title="Offer Duration">{swap.offer_duration}</span>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2 rounded border p-2">
        <div className="text-[10px] font-bold text-right">
          <Button className="text-[10px] p-0" size='sm' variant='link'>Propose Swap</Button>
        </div>
        <div className="flex space-x-2 text-[10px]">
          <span title="Demand Quantity">{swap.demand_quantity}</span>
          <span title="Demand Return">{swap.demand_return}%</span>
          <span title="Demand Duration">{swap.demand_duration}</span>
        </div>
      </div>
    </div>
  );
};

export default SwapRow;
