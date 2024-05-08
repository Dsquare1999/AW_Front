import { Button } from "@/components/ui/button";
import { PiSwap } from "react-icons/pi";
import BondDetailPage from "../../bonds/pages/BondDetailPage";

import React from "react";

const SwapPropositionPage = () => {
    const [detailTrigger, setDetailTrigger] = React.useState<boolean>(false);
  return (
    <div>
      <div className="flex space-x-2">
        <div className="w-full flex flex-col space-y-2 rounded border p-2">
          <h5 className="text-[10px] font-bold">ISIN</h5>
          <div className="flex justify-between items-center text-[10px]">
            <div className="flex space-x-1">
              <span>Quantity</span>
              <span>Rdt%</span>
              <span>Duration</span>
            </div>

            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="text-[10px]"  onClick={() => setDetailTrigger(!detailTrigger)}>
                Details
              </Button>
              <Button size="sm" variant='default' className="text-[10px]" onClick={() => alert("Swap accepted")}>
                <PiSwap className="mr-1" /> Swap
              </Button>
            </div>
          </div>
        </div>
      </div>
      {detailTrigger && <div>
        <BondDetailPage />
      </div>}
    </div>
  );
};

export default SwapPropositionPage;
