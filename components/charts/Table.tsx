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
          <TableHead className="text-[10px]">Bonds</TableHead>
          {data.datasets.map((data) => (
            <TableHead key={data.label} className="text-[10px]">
              {data.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.labels.map((label, indexLabel) => (
          <TableRow key={indexLabel}>
            <TableCell className="text-[10px]">{label}</TableCell>
            {data.datasets.map(
              (
                data: {
                  label: string;
                  data: number[];
                  backgroundColor: string | string[];
                },
                index
              ) => (
                <TableCell key={index + `${data}`} className="text-[10px] text-center">
                  {data["data"][indexLabel]}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
