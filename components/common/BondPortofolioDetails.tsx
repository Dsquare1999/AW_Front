import { OutstandingData } from "@/data/OutstandingData";
import { Bar, Chart, Doughnut, Pie, Radar, Table } from "../charts";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaChartPie } from "react-icons/fa";
import { TbChartRadar } from "react-icons/tb";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { AiOutlineRadarChart } from "react-icons/ai";
import { PiTableFill } from "react-icons/pi";
import { IoExpandOutline } from "react-icons/io5";

import { BondProp } from "@/app/types/BondType";
import { PortofolioDetailData } from "@/data/PortofolioDetailData";
import { useState } from "react";

interface BondPortofolioDetailsProps {
  bonds: BondProp[];
  detailLabel: string | null;
  detailData: number | null;
}

const choosenChart = (chartType: string, data: any, title: string) => {
  switch (chartType) {
    case "Doughnut":
      return <Doughnut data={data} title={title} />;
    case "Pie":
      return <Pie data={data} title={title} />;
    case "Radar":
      return <Radar data={data} title={title} />;
    case "Table":
      return <Table data={data} title={title} />;
    default:
      return <Doughnut data={data} title={title} />;
  }
};

const BondPortofolioDetails = ({
  bonds,
  detailLabel,
  detailData,
}: BondPortofolioDetailsProps) => {
  const [chartType, setChartType] = useState<string>("Doughnut");

  return (
    <>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger onClick={() => setChartType("Pie")}>
            <FaChartPie />
          </MenubarTrigger>
          <MenubarTrigger onClick={() => setChartType("Radar")}>
            <AiOutlineRadarChart />
          </MenubarTrigger>
          <MenubarTrigger onClick={() => setChartType("Doughnut")}>
            <BiSolidDoughnutChart />
          </MenubarTrigger>
          <MenubarTrigger onClick={() => setChartType("Table")}>
            <PiTableFill />
          </MenubarTrigger>
          <Dialog>
            <DialogTrigger>
              <IoExpandOutline />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  {detailLabel !== null && detailData !== null && (
                    <div>
                      {choosenChart(
                        chartType,
                        PortofolioDetailData(bonds, detailLabel, detailData),
                        `Portofolio Outstanding ${chartType} Detail`
                      )}
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </MenubarMenu>
      </Menubar>
      {detailLabel !== null && detailData !== null && (
        <div>
          {choosenChart(
            chartType,
            PortofolioDetailData(bonds, detailLabel, detailData),
            `Portofolio Outstanding ${chartType} Detail`
          )}
        </div>
      )}
    </>
  );
};

export default BondPortofolioDetails;
