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
import clsx from "clsx";

const Volume = ({ size = 'small' } : { size ?: 'small'|'medium'|'large'}) => {
  return (
    <Carousel className={clsx(size == 'small' ? "w-[350px]" : "w-full")}>
      <CarouselContent>
        <CarouselItem>
          <InfoTable headers={volumeHeaders} rows={volumeRows} size={size} />
        </CarouselItem>
        <CarouselItem>
          <div className={clsx(size == 'small' ? "h-[180px]" : "h-[220px]")}>
            <Polar
              data={AmountData() as RadarProps}
              title="Bond Volume Amounts"
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className={clsx(size == 'small' ? "h-[180px]" : "h-[220px]")}>
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
