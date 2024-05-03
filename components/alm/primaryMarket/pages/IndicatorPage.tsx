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

const IndicatorPage = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-[350px]"
    >
      <CarouselContent className="h-[200px]">
        <CarouselItem>
          <PriceTrend />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={indicatorHeaders} rows={indicatorRows} />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={detailsHeaders} rows={detailsRows} />
        </CarouselItem>
      </CarouselContent>
      
    </Carousel>
  );
};

export default IndicatorPage;
