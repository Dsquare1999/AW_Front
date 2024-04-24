import React, { useState, useRef } from "react";
import type { InteractionItem } from 'chart.js';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Legend,
    Tooltip,
    ChartTypeRegistry
} from 'chart.js';
import { Chart, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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

export default function App({
    type,
    data,
    title,
    callback,
}: {
    type: string;
    data: dataProps;
    title: string;
    callback: (data: InteractionItem[]) => void;
}) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: title,
            },
        },
    };
    const printDatasetAtEvent = (dataset: InteractionItem[]) => {
        if (!dataset.length) return;
        const datasetIndex = dataset[0].datasetIndex;
        console.log(data.datasets[datasetIndex].label);
    };

    const printElementAtEvent = (element: InteractionItem[]) => {
        if (!element.length) return;
        const { datasetIndex, index } = element[0];
        console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
    };

    const printElementsAtEvent = (elements: InteractionItem[]) => {
        if (!elements.length) return;
        console.log(elements.length);
    };

    const chartRef = useRef<ChartJS>(null);

    const onClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { current: chart } = chartRef;
        if (!chart) {
            return;
        }
        callback(getElementAtEvent(chart, event));

        // printDatasetAtEvent(getDatasetAtEvent(chart, event));
        // printElementAtEvent(getElementAtEvent(chart, event));
        // printElementsAtEvent(getElementsAtEvent(chart, event));
    };

    const onDoubleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const { current: chart } = chartRef;
        if (!chart) {
            return;
        }
        console.log('Double Click');
    }

    return <Chart
        ref={chartRef}
        type={type as keyof ChartTypeRegistry}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        options={options}
        data={data}
    />
}
