import InfoTable from "../InfoTable";
import Maturity from "../Maturity";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  headers as informationsHeaders,
  rows as informationsRows,
} from "@/data/spreads/InformationsData";

import {
    headers as detailsHeaders,
    rows as detailsRows,
  } from "@/data/spreads/DetailsData";
import clsx from "clsx";

const EmissionPage = ({ size = 'small' } : { size ?: 'small'|'medium'|'large'}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className={clsx(size == 'small' ? "w-[350px]" : "w-full")}
    >
      <CarouselContent className={clsx(size == 'small' ? "h-[200px]" : "h-[250px]")}>
        <CarouselItem>
          <Maturity size={size} />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={informationsHeaders} rows={informationsRows} size={size} />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={detailsHeaders} rows={detailsRows} size={size} />
        </CarouselItem>
      </CarouselContent>
      
    </Carousel>
  );
};

export default EmissionPage;
