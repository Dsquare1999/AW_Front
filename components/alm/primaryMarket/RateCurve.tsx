import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import InfoTable from "./InfoTable";
  
  import {
    headers as ratesHeaders,
    rows as ratesRows,
  } from "@/data/spreads/RatesData";
  import { Line, LineProps } from "@/components/charts";
import { RatesCurveData } from "@/data/spreads/RatesCurveData";
import clsx from "clsx";
  
  const RateCurve = ({ size = 'small' } : { size ?: 'small'|'medium'|'large'}) => {
    return (
      <Carousel className={clsx(size == 'small' ? "w-[350px]" : "w-full")}>
        <CarouselContent>
          <CarouselItem>
            <InfoTable headers={ratesHeaders} rows={ratesRows} size={size} />
          </CarouselItem>
          <CarouselItem>
            <div className={clsx(size == 'small' ? "h-[180px]" : "h-[220px]")}>
              <Line
                data={RatesCurveData() as LineProps}
                title="Rates Curve"
                labelPosition="top"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    );
  };
  
  export default RateCurve;
  