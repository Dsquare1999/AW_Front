import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


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
        display: true,
        text: title,
      },
    },
  };
  return <Doughnut options={options} data={data} />;
}