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
  
  const RateCurve = () => {
    return (
      <Carousel className="w-[350px]">
        <CarouselContent>
          <CarouselItem>
            <InfoTable headers={ratesHeaders} rows={ratesRows} />
          </CarouselItem>
          <CarouselItem>
            <div className="h-[180px]">
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
  