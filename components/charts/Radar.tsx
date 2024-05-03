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

export type dataProps = {
  labels: string[];
  datasets: {
      label: string;
      data: number[];
      backgroundColor: string | string[];
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
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 7
          }
        }
      }
    },
    maintainAspectRatio: false
  };
  return <Radar options={options} data={data} />;
}