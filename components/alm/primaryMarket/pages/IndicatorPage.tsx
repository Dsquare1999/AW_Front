import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import {
  headers as indicatorHeaders,
  rows as indicatorRows,
} from "@/data/spreads/IndicatorData";
import {
  headers as detailsHeaders,
  rows as detailsRows,
} from "@/data/spreads/IndicatorDetailsData";

import PriceTrend from "../PriceTrend";
import InfoTable from "../InfoTable";
import clsx from "clsx";

const IndicatorPage = ({ size = 'small' } : { size ?: 'small'|'medium'|'large'}) => {
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
          <PriceTrend size={size} />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={indicatorHeaders} rows={indicatorRows} size={size}/>
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={detailsHeaders} rows={detailsRows} size={size} />
        </CarouselItem>
      </CarouselContent>
      
    </Carousel>
  );
};

export default IndicatorPage;
