import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";

type RowsType = {
    [ key : string ] : string | number;
  }
  
  type HeadersType = {
    label : string;
    key : string;
  }
  
  type TableType = {
    rows: RowsType[];
    headers: HeadersType[];
  }

const InfoTable : React.FC<TableType> = ({rows, headers}) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center text-[10px] font-semibold bg-foreground/5 p-1">
        {headers.map((item) => (
          <span key={item.key} className="flex-1 text-center">{item.label}</span>
        ))}
      </div>
      <Separator className="my-1" />
      <ScrollArea className="h-[150px] w-full border px-4">
        <ul>
          {rows.map((row, index) => (
            <li
              key={row.key}
              className={`flex justify-between items-center text-[10px] px-2 ${index % 2 === 0 ? "bg-foreground/0" : "bg-foreground/5"}`}
            >
                {
                    headers.map((header, headerIndex) => (
                        <span key={header.key}>{row[header.key]}</span>
                    ))
                }
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default InfoTable;