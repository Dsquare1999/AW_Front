import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
    tooltip: {
      callbacks: {
        label: function(context : any) {
          var label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          label += context.parsed.y;
          return label;
        },
        afterLabel: function(context : any) {
          var index = context.dataIndex;
          var data = context.dataset.data[index];
          var pieChartData = {
            labels: ['A', 'B', 'C'],
            datasets: [{
              data: [1000, 2000, 3000],
              backgroundColor: ['red', 'green', 'blue'],
            }],
          };
          return 'Additional Info:';
        },
      },
    },
  };
  return <Bar options={options} data={data} />;
}
