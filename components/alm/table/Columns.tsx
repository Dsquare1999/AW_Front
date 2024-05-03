"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "./DataTableColumnHeader"

import { RiDeleteBin5Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button"  

export type HeaderProps = {
    [key: string] : string | number
  }

export const Columns= (headers: string[]): ColumnDef<HeaderProps>[] => {
    if (headers && headers.length > 0) {
        const headerColumns: ColumnDef<HeaderProps>[] = headers.map((header: string) => ({
            accessorKey: header,
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={header} />
            ),
        }));
        return headerColumns;
    }
    return []    
};