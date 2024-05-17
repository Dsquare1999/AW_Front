import { Button } from "@/components/ui/button";
import { PiSwap } from "react-icons/pi";
import BondDetailPage from "../../bonds/pages/BondDetailPage";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import React from "react";
import { PropositionType } from "@/app/types/SwapType";
import { BondAccordionContent } from "../../bonds/pages/BondPortofolioPage";
import BondsHeader from "../../bonds/BondsHeader";
import BondRow from "../../bonds/BondRow";

interface SwapPropositionPageProps {
  propositions: PropositionType[];
}

const SwapPropositionPage = ({ propositions }: SwapPropositionPageProps) => {
  const [detailTrigger, setDetailTrigger] = React.useState<boolean>(false);
  const [choosenProposition, setChoosenProposition] =
    React.useState<PropositionType | null>(null);
  return (
    <div>
      {propositions.map((proposition) => (
        <div key={proposition.id}>
          <div className="flex space-x-2">
            <div className="w-full flex flex-col space-y-2 rounded border p-2">
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex">
                  <Drawer>
                    <DrawerTrigger className="">
                      <h5
                        className="text-[10px] font-bold"
                        title="Proposition Isin"
                      >
                        {proposition.proposition_bond.admin_bond.isin}
                      </h5>
                    </DrawerTrigger>
                    <DrawerContent>
                      <ScrollArea className="flex w-full p-4">
                        <BondsHeader />
                        <Separator className="my-2" />
                        <BondRow bond={proposition.proposition_bond} />
                        <Separator className="my-2" />
                        <div className="flex space-x-10">
                          <div>
                            <BondAccordionContent
                              bond={proposition.proposition_bond}
                              size="large"
                            />
                          </div>
                          <BondDetailPage opened={true} size="large" />
                        </div>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                      <DrawerFooter>
                        <DrawerClose className="flex justify-end items-center">
                          <Button variant="destructive">Cancel</Button>
                        </DrawerClose>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>

                <div className="flex space-x-1">
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
        </div>
      ))}
    </div>
  );
};

export default SwapPropositionPage;
