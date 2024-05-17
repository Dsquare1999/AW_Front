import { Line, LineProps } from "@/components/charts";
import { Progress } from "@/components/ui/progress";
import { PriceTrendData } from "@/data/spreads/PriceTrendData";
import clsx from "clsx";
import Image from "next/image";

const PriceTrend = ({ size = 'small' } : { size ?: 'small'|'medium'|'large'}) => {
  return (
    <article className="w-full">
      <div className="w-full flex items-center space-x-1">
        <div className="w-full">
          <p className="w-full flex justify-end items-center uppercase text-algoMarron  dark:text-algoOrange text-[10px]">
            IVORY_COAST OAT IF 6% 2022-2026
          </p>
          <div className="w-full grid grid-cols-4 gap-2">
            <div className="col-span-3 h-full flex flex-col justify-end">
              <div className="flex justify-between items-center text-[10px]">
                <span>Days to PriceTrend</span>
                <span>60%</span>
              </div>
              <Progress className="h-2" value={60} />
            </div>
            <div className="col-span-1 w-full h-full flex items-end text-[10px] ">
              <b className="mr-1">Last Price: </b>$17.5
            </div>
          </div>
        </div>
        <aside className="w-[75px]">
          <Image
            alt="Image du drapeau"
            src="assets/image/countries/Ivory.svg"
            width={75}
            height={75}
          />
        </aside>
      </div>

      <div className={clsx(size == 'small' ? "max-h-[100px]" : "max-h-[300px]", 'w-full')}>
        <Line data={PriceTrendData() as LineProps} title="Bond Price Trends" />
      </div>
    </article>
  );
};

export default PriceTrend;
