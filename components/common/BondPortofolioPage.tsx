"use client";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

import { Button } from "../ui/button";
import Section from "./Section";

import { CashflowProp, BondProp } from "@/app/types/BondType";
import CashflowView from "../alm/bonds/CashflowView";
import BondsHeader from "../alm/bonds/BondsHeader";
import BondRow from "../alm/bonds/BondRow";
import ValorisationView from "../alm/bonds/ValorisationView";
import DurationView from "../alm/bonds/DurationView";
import EconomicValueView from "../alm/bonds/EcomicValueView";
import { useState } from "react";

interface BondPortofolioPageProps {
  bonds: BondProp[];
}

const BondAccordionContent = ({ bond }: { bond: BondProp }) => (
  <div className="flex flex-col space-y-4">
    <div className="w-full flex space-x-4">
      <div className="flex-1">
        <CashflowView
          cashflows={bond.cashflows}
          due_date={bond.due_date}
          value_date={bond.value_date}
        />
      </div>
      <div className="flex-1">
        <ValorisationView
          valorisations={bond.valorisations}
          due_date={bond.due_date}
          value_date={bond.value_date}
        />
      </div>
    </div>
    <DurationView
      durations={bond.duration_macaulay}
      due_date={bond.due_date}
      value_date={bond.value_date}
    />
    <EconomicValueView
      economicValues={bond.valorisations}
      due_date={bond.due_date}
      value_date={bond.value_date}
    />
  </div>
);

const BondPortofolioPage = ({ bonds }: BondPortofolioPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Section
      title="Bonds"
      description="Find all your portofolio bonds here ..."
    >
      <BondsHeader />
      <Separator className="my-2" />
      <Accordion type="single" collapsible defaultValue="Bond 1">
        {bonds.map((bond, index) => (
          <AccordionItem value={`Bond ${index + 1}`} key={index}>
            <AccordionTrigger>
              <BondRow bond={bond} />
            </AccordionTrigger>
            <AccordionContent className="flex flex-col space-y-4">
              <BondAccordionContent bond={bond} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
};

export default BondPortofolioPage;
