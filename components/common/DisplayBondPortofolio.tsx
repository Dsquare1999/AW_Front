import { OutstandingData } from "@/data/OutstandingData";
import { Bar } from "../charts";
import Section from "./Section";
import { BondProp } from "@/app/types/BondType";

interface DisplayBondPortofolioProps {
    bonds: BondProp[];
  }


const DisplayBondPortofolio = ({ bonds }: DisplayBondPortofolioProps) => {
    return ( 
        <Section title="Bonds Portofolio" description="This is a summary of your portofolio ...">
            <div className="w-full">
                <Bar data={OutstandingData(bonds)} title={`Bond Portofolio Outstanding `} />
            </div>
        </Section>
     );
}
 
export default DisplayBondPortofolio;