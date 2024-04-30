import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface dataProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[] | string;
  }[];
}
export default function App({
  data,
  title,
}: {
  data: dataProps;
  title: string;
}) {
  return (
    <Table>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Labels</TableHead>
          {data.labels.map((label, index) => (
            <TableHead key={index}>{label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.datasets.map((dataset, index) => (
          <TableRow key={index + `${dataset.label}`}>
            <TableCell key={index}>{dataset.label}</TableCell>
            {dataset.data.map((data, index) => (
              <TableCell key={index + `${data}`}>{data}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
