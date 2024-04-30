import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface dataProps {
  labels: string[];
  datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
  }[];
}

export default function App({data, title}: {data: dataProps, title: string}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: title,
      },
    },
  };
  return <Radar options={options} data={data} />;
}