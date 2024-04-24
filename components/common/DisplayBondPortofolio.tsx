'use client'
import { OutstandingData } from "@/data/OutstandingData";
import { Chart } from "../charts";
import Section from "./Section";
import { BondProp } from "@/app/types/BondType";
import { useCallback, useState } from "react";
import type { InteractionItem } from 'chart.js';
import BondPortofolioDetails from "./BondPortofolioDetails";


interface DisplayBondPortofolioProps {
    bonds: BondProp[];
}


const DisplayBondPortofolio = ({ bonds }: DisplayBondPortofolioProps) => {
    const [selectedBar, setSelectedBar] = useState<boolean | null>(null);
    const [detailLabel, setDetailLabel] = useState<string | null>(null);
    const [detailData, setDetailData] = useState<number | null>(null);

    // const handleBarClick = (element: InteractionItem[]) => {
    //     if (!element.length) return;

    //     const { datasetIndex, index } = element[0];

    //     setSelectedBar(true);
    //     setDetailLabel(OutstandingData(bonds).labels[index]);
    //     setDetailData(OutstandingData(bonds).datasets[datasetIndex].data[index]);

    //     console.log(OutstandingData(bonds).labels[index], OutstandingData(bonds).datasets[datasetIndex].data[index]);
    // }

    const handleBarClick = useCallback((element: InteractionItem[]) => {
        if (element.length) {
            const { datasetIndex, index } = element[0];
            setSelectedBar(true);
            setDetailLabel(OutstandingData(bonds).labels[index]);
            setDetailData(OutstandingData(bonds).datasets[datasetIndex].data[index]);
        } else {
            setSelectedBar(null);
            setDetailLabel(null); 
            setDetailData(null);
        }

        console.log('Element', element)
        console.log('Selected Bar', selectedBar)
        console.log('Detail Label', detailLabel)
        console.log('Detail Data', detailData)
    }, [bonds, selectedBar, detailLabel, detailData])


    return (
        <Section title="Bonds Portofolio" description="This is a summary of your portofolio ...">
            <div className="w-full flex space-x-4">
                <Chart type="bar" data={OutstandingData(bonds)} title={`Bond Portofolio Outstanding `} callback={(element) => handleBarClick(element)} />
                {selectedBar !== null && detailLabel !== null && detailData !== null && (
                    <div>
                        <BondPortofolioDetails bonds={bonds} detailLabel={detailLabel} detailData={detailData} />
                    </div>
                )}
            </div>
        </Section>
    );
}

export default DisplayBondPortofolio;