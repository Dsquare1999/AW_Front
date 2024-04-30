"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { CaretSortIcon } from "@radix-ui/react-icons";

import { Button } from "../../../ui/button";
import Section from "../../../common/Section";

import { CashflowProp, BondProp } from "@/app/types/BondType";
import CashflowView from "../CashflowView";
import BondsHeader from "../BondsHeader";
import BondRow from "../BondRow";
import ValorisationView from "../ValorisationView";
import DurationView from "../DurationView";
import EconomicValueView from "../EcomicValueView";
import { useState } from "react";
import clsx from "clsx";

interface BondPortofolioPageProps {
  bonds: BondProp[];
}

const BondAccordionContent = ({ bond }: { bond: BondProp }) => (
  <Carousel className="max-w-[490px]">
    <CarouselContent>
      <CarouselItem>
        <div className="w-full flex space-x-2">
          <CashflowView
            cashflows={bond.cashflows}
            due_date={bond.due_date}
            value_date={bond.value_date}
          />
          <ValorisationView
            valorisations={bond.valorisations}
            due_date={bond.due_date}
            value_date={bond.value_date}
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <DurationView
          durations={bond.duration_macaulay}
          due_date={bond.due_date}
          value_date={bond.value_date}
        />
      </CarouselItem>
      <CarouselItem>
        <EconomicValueView
          economicValues={bond.valorisations}
          due_date={bond.due_date}
          value_date={bond.value_date}
        />
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
);

const BondPortofolioPage = ({ bonds }: BondPortofolioPageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [choosenBond, setChoosenBond] = useState<BondProp | null>(null);
  return (
    <Section
      title="Bonds"
      description="Find all your portofolio bonds here ..."
    >
      <div className="w-full class-test">
        <div className="flex">
          <ScrollArea className="h-72 w-24 rounded-md border">
            <div className="p-1">
              <h4 className="mb-4 text-xs font-medium leading-none">Isin</h4>
              {bonds.map((bond, index) => (
                <>
                  <div
                    key={index}
                    className={clsx(`text-[9px] cursor-pointer py-1`, bond === choosenBond && "bg-foreground/10")}
                    onClick={() => setChoosenBond(bond)}
                  >
                    {bond.isin}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
              {bonds.map((bond, index) => (
                <>
                  <div
                    key={index}
                    className={clsx(`text-[9px] cursor-pointer py-1`, bond === choosenBond && "bg-foreground/10")}
                    onClick={() => setChoosenBond(bond)}
                  >
                    {bond.isin}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          </ScrollArea>
          <div>
            <BondsHeader />
            <Separator className="my-2" />
            <Accordion type="single" collapsible defaultValue="Selected Bond">
              {choosenBond && (
                <AccordionItem value={`Selected Bond`}>
                  <AccordionTrigger>
                    <BondRow bond={choosenBond} />
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col space-y-4">
                    <BondAccordionContent bond={choosenBond} />
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BondPortofolioPage;
