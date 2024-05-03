import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

import Volume from "../Volume";
import RateCurve from "../RateCurve";

const HistoricPage = () => {
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
          <div className="flex w-full">
            <Image
              alt="Image du drapeau"
              src="assets/image/countries/Ivory.svg"
              width={200}
              height={200}
            />
            <div className="flex flex-col justify-between w-full ml-3">
              <b className="text-xs">IVORY COAST (WAEMU)</b>
              <p className="flex justify-between items-center text-xs">
                <span className="text-xs">GDP per Capita:</span>
                <span className="text-xs">38,907</span>
              </p>
              <p className="flex justify-between items-center text-xs">
                <span className="text-xs">Economic Growth:</span>
                <span className="text-xs">20%</span>
              </p>
              <p className="flex justify-between items-center text-xs">
                <span className="text-xs">Inflation Rate:</span>
                <span className="text-xs">05%</span>
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <Volume />
        </CarouselItem>
        <CarouselItem>
          <RateCurve />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default HistoricPage;
