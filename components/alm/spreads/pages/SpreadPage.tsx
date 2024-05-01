'use client'
import { SpreadType } from "@/app/types/SpreadType";
import Section from "@/components/common/Section";
import SpreadHeader from "../SpreadHeader";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Separator } from "../../../ui/separator";
import SpreadRow from "../SpreadRow";
import EmissionPage from "../../primaryMarket/pages/EmissionPage";

interface SpreadPageProps {
    spreads: SpreadType[]
}
const SpreadPage = ({spreads} : SpreadPageProps) => {
    return ( 
        <Section title="Spreads" description="Here are spreads ...">
            <SpreadHeader />
            <Separator className="my-2" />
            <Accordion type="single" collapsible defaultValue="Bond 1">
                {spreads.map((spread, index) => (
                <AccordionItem value={`Bond ${index + 1}`} key={index}>
                    <AccordionTrigger>
                    <SpreadRow spread={spread} />
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-4">
                        <EmissionPage />
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </Section>
     );
}
 
export default SpreadPage;