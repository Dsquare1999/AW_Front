import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface dataProps {
  labels: string[];
  datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
  }[];
}

export default function App({data, title, labelPosition}: {data: dataProps, title: string, labelPosition?:'right'|'left'|'bottom'|'top'}) {
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
  };
  return <Line options={options} data={data} />;
}