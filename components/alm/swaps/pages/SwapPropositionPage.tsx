import { Button } from "@/components/ui/button";
import { PiSwap } from "react-icons/pi";
import BondDetailPage from "../../bonds/pages/BondDetailPage";

import React from "react";
import { PropositionType } from "@/app/types/SwapType";

interface SwapPropositionPageProps {
  propositions: PropositionType[];
}

const SwapPropositionPage = ({ propositions }: SwapPropositionPageProps) => {
  const [detailTrigger, setDetailTrigger] = React.useState<boolean>(false);
  const [choosenProposition, setChoosenProposition] = React.useState<PropositionType | null>(null);
  return (
    <div>
      {propositions.map((proposition) => (
      <div key={proposition.id}>
        <div className="flex space-x-2">
          <div className="w-full flex flex-col space-y-2 rounded border p-2">
            
            <div className="flex justify-between items-center text-[10px]">
              <div className="flex">
              <h5 className="text-[10px] font-bold" title="Proposition Isin">{proposition.proposition_bond.admin_bond.isin}</h5>
              </div>

              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[10px]"
                  onClick={() => setChoosenProposition(proposition)}
                >
                  Details
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  className="text-[10px]"
                  onClick={() => alert("Swap accepted")}
                >
                  <PiSwap className="mr-1" /> Swap
                </Button>
              </div>
            </div>
          </div>
        </div>
        {choosenProposition == proposition && (
          <div>
            <BondDetailPage />
          </div>
        )}
      </div>
      ))}
    </div>
  );
};

export default SwapPropositionPage;
