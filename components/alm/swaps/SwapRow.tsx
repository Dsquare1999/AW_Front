import { SwapType } from "@/app/types/SwapType";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import BondRow from "../bonds/BondRow";
import { BondAccordionContent } from "../bonds/pages/BondPortofolioPage";
import BondsHeader from "../bonds/BondsHeader";
import { Separator } from "@/components/ui/separator";
import BondDetailPage from "../bonds/pages/BondDetailPage";

interface SwapRowsProps {
  swap: SwapType;
}

const SwapRow = ({ swap }: SwapRowsProps) => {
  return (
    <div className="flex space-x-4">
      <div className="w-full flex flex-col space-y-2 rounded border p-2">
        <Drawer>
          <DrawerTrigger className="">
            <h5
              className="text-[10px] font-bold text-left h-8 flex items-center"
              title="Offer Bond Isin"
            >
              {swap.offer_bond.admin_bond.isin}
            </h5>
          </DrawerTrigger>
          <DrawerContent>
            <ScrollArea className="flex w-full p-4">
              <BondsHeader />
              <Separator className="my-2" />
              <BondRow bond={swap.offer_bond} />
              <Separator className="my-2" />
              <div className="flex space-x-10">
                <div>
                  <BondAccordionContent bond={swap.offer_bond} size="large" />
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
        <div className="flex space-x-2 text-[10px]">
          <span title="Offer Quantity">{swap.offer_quantity}</span>
          <span title="Offer Return">{swap.offer_return}%</span>
          <span title="Offer Duration">{swap.offer_duration}</span>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2 rounded border p-2">
        <div className="text-[10px] font-bold text-right">
          <Button className="text-[10px] p-0" size="sm" variant="link">
            Propose Swap
          </Button>
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
