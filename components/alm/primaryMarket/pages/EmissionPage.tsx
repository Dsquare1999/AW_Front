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

const EmissionPage = () => {
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
          <Maturity />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={informationsHeaders} rows={informationsRows} />
        </CarouselItem>
        <CarouselItem>
          <InfoTable headers={detailsHeaders} rows={detailsRows} />
        </CarouselItem>
      </CarouselContent>
      
    </Carousel>
  );
};

export default EmissionPage;
