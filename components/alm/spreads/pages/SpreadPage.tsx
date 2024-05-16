"use client";
import { SpreadType } from "@/app/types/SpreadType";
import Section from "@/components/common/Section";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

import SpreadHeader from "../SpreadHeader";
import SpreadRow from "../SpreadRow";
import EmissionPage from "../../primaryMarket/pages/EmissionPage";
import IndicatorPage from "../../primaryMarket/pages/IndicatorPage";
import HistoricPage from "../../primaryMarket/pages/HistoricPage";
import SpreadPropositionPage from "./SpreadPropositionPage";

import React from "react";
import clsx from "clsx";

import AddSpreads from "../AddSpread";

interface SpreadPageProps {
  spreads: SpreadType[];
}
const SpreadPage = ({ spreads }: SpreadPageProps) => {
  const [choosenSpread, setChoosenSpread] = React.useState<SpreadType | null>(
    null
  );
  const [addSpreadTrigger, setAddSpreadTrigger] =
    React.useState<boolean>(false);
  return (
    <Section title="Spreads" description="Here are spreads ...">
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
            title="Add Spread"
            onClick={() => setAddSpreadTrigger(!addSpreadTrigger)}
          >
            <LuListPlus />
          </ToggleGroupItem>
          <ToggleGroupItem value="d" title="My Spreads">
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

        {addSpreadTrigger && (
          <div>
            <AddSpreads />
          </div>
        )}
        {!addSpreadTrigger && (
          <div className="flex">
            <ScrollArea className="h-72 w-24 rounded-md border">
              <div className="p-1">
                <h4 className="mb-4 text-xs font-medium leading-none">Isin</h4>
                {spreads.map((spread) => (
                  <div key={spread.id}>
                    <div
                      className={clsx(
                        `text-[9px] cursor-pointer py-1`,
                        spread === choosenSpread && "bg-foreground/10"
                      )}
                      onClick={() => setChoosenSpread(spread)}
                    >
                      <span>{spread.admin_bond.isin} </span>
                      <span>[{spread.bid}</span>-<span>{spread.ask}] : </span>
                      <span>{spread.quantity}</span>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div>
              <SpreadHeader />
              <Separator className="my-2" />
              <Accordion
                type="single"
                collapsible
                defaultValue="Selected Spread"
              >
                {choosenSpread !== null && choosenSpread && (
                  <AccordionItem value={`Selected Spread`}>
                    <AccordionTrigger>
                      <SpreadRow spread={choosenSpread} />
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-4">
                      <Tabs className="w-full">
                        <TabsList className="w-full flex">
                          <TabsTrigger className="flex-1" value="emission">
                            Emission
                          </TabsTrigger>
                          <TabsTrigger className="flex-1" value="indicateur">
                            Indicateur
                          </TabsTrigger>
                          <TabsTrigger className="flex-1" value="historique">
                            Historique
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="emission">
                          <EmissionPage />
                        </TabsContent>
                        <TabsContent value="indicateur">
                          <IndicatorPage />
                        </TabsContent>
                        <TabsContent value="historique">
                          <HistoricPage />
                        </TabsContent>
                      </Tabs>

                      <SpreadPropositionPage
                        propositions={choosenSpread.propositions}
                      />
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default SpreadPage;
