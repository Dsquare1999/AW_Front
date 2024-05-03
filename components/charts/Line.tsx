import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type dataProps = {
  labels: string[];
  datasets: {
    fill?: boolean;
    label: string;
    data: number[];
    borderColor?: string | string[]
    backgroundColor: string | string[];
  }[];
};

export default function App({
  data,
  title,
  labelPosition,
}: {
  data: dataProps;
  title: string;
  labelPosition?: "right" | "left" | "bottom" | "top";
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: labelPosition ? labelPosition : undefined,
        display: labelPosition ? true : false,
      },
      title: {
        display: false,
        text: title,
      },
    },
    maintainAspectRatio: false
  };
  return <Line options={options} data={data} />;
}
