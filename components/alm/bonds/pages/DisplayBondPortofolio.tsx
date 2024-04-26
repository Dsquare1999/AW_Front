'use client'
import { OutstandingData } from "@/data/bonds/OutstandingData";
import { Chart, Table } from "../../../charts";
import Section from "../../../common/Section";
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
            <div className="w-full flex items-center justify-center space-x-4">
                <div className={`${selectedBar !== null ? 'w-[50%]' : 'w-full'}`}>
                    {/* <Table data={OutstandingData(bonds, false)} title={`Bond Portofolio Outstanding `} /> */}
                    <Chart type="bar" data={OutstandingData(bonds, false)} title={`Bond Portofolio Outstanding `} callback={(element) => handleBarClick(element)} />
                </div>
                {selectedBar !== null && detailLabel !== null && detailData !== null && (
                    <div className={`${selectedBar !== null ? 'w-[45%]' : ''}`}>
                        <BondPortofolioDetails bonds={bonds} detailLabel={detailLabel} detailData={detailData} />
                    </div>
                )}
            </div>
        </Section>
    );
}

export default DisplayBondPortofolio;