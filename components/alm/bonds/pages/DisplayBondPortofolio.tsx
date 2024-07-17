"use client";
import { OutstandingData } from "@/data/bonds/OutstandingData";
import { Chart, Table } from "../../../charts";
import Section from "../../../common/Section";
import { BondPortofolioPageProps, BondProp } from "@/app/types/BondType";
import { useCallback, useState } from "react";
import type { InteractionItem } from "chart.js";
import BondPortofolioDetails from "./BondPortofolioDetails";
import { Select } from "@/components/ui/select";
import SwitchPortofolio from "../SwitchPortofolio";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TbSwitch3 } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import AddPortofolio from "../AddPortofolio";

interface DisplayBondPortofolioProps {
  portofolios: BondPortofolioPageProps[];
  bonds: BondProp[];
}

const DisplayBondPortofolio = ({ bonds, portofolios }: DisplayBondPortofolioProps) => {
  const [selectedBar, setSelectedBar] = useState<boolean | null>(null);
  const [detailLabel, setDetailLabel] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<number | null>(null);
  const [switchPortofolioState, setSwitchPortofolioState] = useState<boolean>(false);
  const [addPortofolioState, setAddPortofolioState] = useState<boolean>(false);

  const handleBarClick = useCallback(
    (element: InteractionItem[]) => {
      if (element.length) {
        const { datasetIndex, index } = element[0];
        setSelectedBar(true);
        setDetailLabel(OutstandingData(bonds).labels[index]);
        setDetailData(
          OutstandingData(bonds).datasets[datasetIndex].data[index]
        );
      } else {
        setSelectedBar(null);
        setDetailLabel(null);
        setDetailData(null);
      }

      console.log("Element", element);
      console.log("Selected Bar", selectedBar);
      console.log("Detail Label", detailLabel);
      console.log("Detail Data", detailData);
    },
    [bonds, selectedBar, detailLabel, detailData]
  );

  return (
    <Section
      title="Bonds Portofolio"
      description="This is a summary of your portofolio ..."
    >
      <div className="flex flex-col">
        <ToggleGroup
          type="single"
          className="m-0 border flex justify-end items-center"
        >
          <ToggleGroupItem value="z" title="Switch" onClick={()=>{
            setSwitchPortofolioState(!switchPortofolioState)
            setAddPortofolioState(false)
          }}>
            <TbSwitch3 />
          </ToggleGroupItem>
          <ToggleGroupItem value="a" title="Add" onClick={()=>{
            setAddPortofolioState(!addPortofolioState)
            setSwitchPortofolioState(false)
          }}>
            <IoMdAdd />
          </ToggleGroupItem>
        </ToggleGroup>
        <div className="my-8">
          {switchPortofolioState && <SwitchPortofolio portofolios={portofolios} />}
          {addPortofolioState && <AddPortofolio portofolios={portofolios}/>}
        </div>
      {bonds.length > 0 ? (
      <div className="w-full flex flex-col justify-center">
        {selectedBar !== null && detailLabel !== null && detailData !== null ? (
          <div className='w-full'>
            <BondPortofolioDetails
              bonds={bonds}
              detailLabel={detailLabel}
              detailData={detailData}
              backToPortofolio={() => setSelectedBar(null)}
            />
          </div>
          ) : (
            <div className='w-full'>
              <Chart
                type="bar"
                data={OutstandingData(bonds, false)}
                title={`Bond Portofolio Outstanding `}
                callback={(element) => handleBarClick(element)}
              />
            </div>
          )}
      </div>) :
      (
        <div className="w-full flex flex-col justify-center items-center h-72">
          <span className="text-xs font-medium">No bond in current portofolio</span>
        </div>
      )}
      </div>
    </Section>
  );
};

export default DisplayBondPortofolio;
