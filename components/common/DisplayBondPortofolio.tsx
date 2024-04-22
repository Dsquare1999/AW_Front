import Section from "./Section";
import { BondProp } from "@/app/types/BondType";

interface BondPortofolioPageProps {
    bonds: BondProp[];
  }
const DisplayBondPortofolio = ({ bonds }: BondPortofolioPageProps) => {
    return ( 
        <Section title="Bonds Portofolio" description="This is a summary of your portofolio ...">
            <div>Here we go .....</div>
        </Section>
     );
}
 
export default DisplayBondPortofolio;