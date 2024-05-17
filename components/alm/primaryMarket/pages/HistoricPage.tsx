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
import clsx from "clsx";

const HistoricPage = ({ size = 'small' } : { size ?: 'small'|'medium'|'large'}) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className={clsx(size == 'small' ? "w-[350px]" : "w-[40vw]")}
    >
      <CarouselContent className={clsx(size == 'small' ? "h-[200px]" : "h-[250px]")}>
        <CarouselItem>
          <div className="flex">
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
          <Volume size={size}/>
        </CarouselItem>
        <CarouselItem>
          <RateCurve size={size} />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default HistoricPage;
