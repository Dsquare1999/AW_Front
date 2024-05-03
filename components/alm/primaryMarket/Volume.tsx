import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import InfoTable from "./InfoTable";

import {
  headers as volumeHeaders,
  rows as volumeRows,
} from "@/data/spreads/VolumeData";
import { Pie, PieProps, Polar, Radar, RadarProps } from "@/components/charts";
import { ProportionData, AmountData } from "@/data/spreads/ProportionsData";

const Volume = () => {
  return (
    <Carousel className="w-[350px]">
      <CarouselContent>
        <CarouselItem>
          <InfoTable headers={volumeHeaders} rows={volumeRows} />
        </CarouselItem>
        <CarouselItem>
          <div className="h-[180px]">
            <Polar
              data={AmountData() as RadarProps}
              title="Bond Volume Amounts"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="h-[180px]">
            <Pie
              data={ProportionData() as PieProps}
              title="Bond Volume Proportions"
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default Volume;
