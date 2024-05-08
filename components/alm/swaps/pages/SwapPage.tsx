import Section from "@/components/common/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "../../../ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { LuListPlus } from "react-icons/lu";
import { LuListTodo } from "react-icons/lu";
import { LuListTree } from "react-icons/lu";
import { LuListFilter } from "react-icons/lu";
import { LuListRestart } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuExpand } from "react-icons/lu";
import { LuPin } from "react-icons/lu";
import React from "react";
import AddSwapForm from "./AddSwapForm";
import SwapHeader from "../SwapHeader";
import SwapRow from "../SwapRow";
import SwapPropositionPage from "./SwapPropositionPage";
import clsx from "clsx";


const SwapPage = () => {
  //   const [choosenSwap, setChoosenSwap] = React.useState<SwapType | null>(null);
  const [hoveredSwap, setHoveredSwap] = React.useState<string | null>(null);
  const [addSwapTrigger, setAddSwapTrigger] = React.useState<boolean>(false);
  return (
    <Section title="Swaps" description="Here are swaps ...">
      <div className="w-full">
        <ToggleGroup
          type="single"
          className="m-0 mb-2 border flex justify-end items-center"
        >
          <ToggleGroupItem value="z" title="Search">
            <LuSearch />
          </ToggleGroupItem>
          <ToggleGroupItem value="a" title="Filter">
            <LuListFilter />
          </ToggleGroupItem>
          <ToggleGroupItem value="b" title="Actualize">
            <LuListRestart />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="c"
            title="Add Swap"
            onClick={() => setAddSwapTrigger(!addSwapTrigger)}
          >
            <LuListPlus />
          </ToggleGroupItem>
          <ToggleGroupItem value="d" title="My Swaps">
            <LuListTodo />
          </ToggleGroupItem>
          <ToggleGroupItem value="e" title="My Propositions">
            <LuListTree />
          </ToggleGroupItem>
          <ToggleGroupItem value="f" title="Pin">
            <LuPin />
          </ToggleGroupItem>
          <ToggleGroupItem value="g" title="Expand">
            <LuExpand />
          </ToggleGroupItem>
        </ToggleGroup>

        {/* <AddSwapForm /> */}
        
        <div
          className="w-full p-2 relative"
          onMouseEnter={() => setHoveredSwap("swap")}
          onMouseLeave={() => setHoveredSwap(null)}
        >
  
        </div>

        <div className="flex">
            <ScrollArea className="h-72 w-24 rounded-md border">
              <div className="p-1">
                <h4 className="mb-4 text-xs font-medium leading-none">Isin</h4>
                {/* {spreads.map((spread) => ( */}
                  {/* <div key={spread.id}> */}
                    <div
                      className={clsx(
                        `text-[9px] cursor-pointer py-1`,
                        // spread === choosenSpread && "bg-foreground/10"
                      )}
                      // onClick={() => setChoosenSpread(spread)}
                    >
                      <span>
                        Isin
                        {/* {spread.admin_bond.isin}  */}
                        </span>
                      {/* <span>[{spread.bid}</span>-<span>{spread.ask}] : </span> */}
                      {/* <span>{spread.quantity}</span> */}
                    </div>
                    <Separator className="my-2" />
                  {/* </div> */}
                {/* ))} */}
              </div>
            </ScrollArea>
            <div>
              <SwapHeader />
              <Separator className="my-2" />
              <Accordion
                type="single"
                collapsible
                defaultValue="Selected Spread"
              >
                {/* {choosenSpread !== null && choosenSpread && ( */}
                  <AccordionItem value={`Selected Spread`}>
                    <AccordionTrigger>
                      <SwapRow />
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-4">
                      <SwapPropositionPage />
                    </AccordionContent>
                  </AccordionItem>
                {/* )} */}
              </Accordion>
            </div>
          </div>

      </div>
    </Section>
  );
};

export default SwapPage;
