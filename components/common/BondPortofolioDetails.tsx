import { OutstandingData } from "@/data/OutstandingData";
import { Chart } from "../charts";

import { BondProp } from "@/app/types/BondType";
import { PortofolioDetailData } from "@/data/PortofolioDetailData";

interface BondPortofolioDetailsProps {
    bonds: BondProp[];
    detailLabel: string | null;
    detailData: number | null;
}

const BondPortofolioDetails = ({ bonds, detailLabel, detailData }: BondPortofolioDetailsProps) => {
    const handleBarClick = (element: any) => {
        console.log(element);
    }
    console.log("C'est chargé", detailLabel, detailData);

    return (
        detailLabel !== null && detailData !== null &&
        (
            <div>
                <Chart type="bar" data={PortofolioDetailData(bonds, detailLabel, detailData)} title={`Bond Portofolio Detail `} callback={handleBarClick} />
            </div>
        )
    );
}

export default BondPortofolioDetails;