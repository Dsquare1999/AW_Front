"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadBondPage from "../../uploads/UploadBondPage";

interface BondPortofolioPageProps {
  bonds: BondProp[];
}

export const BondAccordionContent = ({ bond, size = 'small' }: { bond: BondProp, size ?: 'small'|'medium'|'large' }) => (
  <Carousel className={clsx(size == 'small' ? 'max-w-[490px]':'max-w-[800px]')}>
    <CarouselContent>
      <CarouselItem>
        <div className="w-full flex space-x-2">
          <CashflowView
            cashflows={bond.cashflows}
            due_date={bond.due_date}
            value_date={bond.value_date}
            size={size}
          />
          <ValorisationView
            valorisations={bond.valorisations}
            due_date={bond.due_date}
            value_date={bond.value_date}
            size={size}
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <DurationView
          durations={bond.duration_macaulay}
          due_date={bond.due_date}
          value_date={bond.value_date}
          size={size}
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
  const [choosenBond, setChoosenBond] = useState<BondProp | null>(null);
  return (
    <Section
      title="Bonds"
      description="Find all your portofolio bonds here ..."
    >
      <div className="w-full">
        {bonds.length > 0 ? ( <div className="flex">
          <ScrollArea className="h-full w-24 rounded-md border">
            <div className="p-1">
              <h4 className="mb-4 text-xs font-medium leading-none">Isin</h4>
              {bonds.map((bond, index) => (
                <div key={bond.id}>
                  <div
                    className={clsx(`text-[9px] cursor-pointer py-1`, bond === choosenBond && "bg-foreground/10")}
                    onClick={() => setChoosenBond(bond)}
                  >
                    <span className="block">{bond.admin_bond.isin} </span>
                    <span> {bond.refund}</span>
                    <span> {bond.type}</span>
                    <span> {bond.facial_rate*100}%</span>
                  </div>
                  <Separator className="my-2" />
                </div>
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
        </div>):(
          <div className="flex flex-col justify-center items-center h-72">
            <span className="text-xs font-medium">No bond found</span>
            <Drawer>
            <DrawerTrigger className="flex items-center  h-12 px-2 mt-2 rounded">
              <span className="flex items-center w-full border p-2 rounded shadow">
                <IoCloudUploadOutline className="w-4 h-4 stroke-current" />
                <span className="md:ml-2 text-[10px] font-medium sr-only sm:not-sr-only sm:whitespace-nowrap">Add Bond</span>
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <ScrollArea className="flex w-full">
                <UploadBondPage />
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
        )}
      </div>
    </Section>
  );
};

export default BondPortofolioPage;
