import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export type dataProps = {
  labels: string[];
  datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
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
    maintainAspectRatio: false
    
  };
  return <Pie options={options} data={data}  />;
}