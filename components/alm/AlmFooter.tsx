import styles from "@/components/styles/alm.module.css";
import clsx from "clsx";

import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
const AlmFooter = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full bg-background overflow-hidden'>
      <div className={clsx(styles.scrollingContent, `text-[8px] flex`)}>
        <div className='p-1 whitespace-nowrap flex items-center'>
          ELIOR GROUP <span className="ml-1 flex items-center"><FaCaretUp className="mr-1 w-4 h-4 text-emerald-700" /> +27,90 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          NVIDIA CORPORATION <span className="ml-1 flex items-center"><FaCaretUp className="mr-1 w-4 h-4 text-emerald-700" /> +3,58 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          TELEPERFORMANCE SE <span className="ml-1 flex items-center"><FaCaretUp className="mr-1 w-4 h-4 text-emerald-700" /> +0,91 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          LVMH <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-0,58 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          VALLOUREC <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-1,22 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          STELLANTIS N.V. <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-1,45 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          TOTALENERGIES SE <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-1,60 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          VIRIDIEN <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-2,31 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          UBISOFT ENTERTAINMENT <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-12,90 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          GAMESTOP CORP. <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-18,87 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          ELIOR GROUP <span className="ml-1 flex items-center"><FaCaretUp className="mr-1 w-4 h-4 text-emerald-700" /> +27,90 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          NVIDIA CORPORATION <span className="ml-1 flex items-center"><FaCaretUp className="mr-1 w-4 h-4 text-emerald-700" /> +3,58 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          TELEPERFORMANCE SE <span className="ml-1 flex items-center"><FaCaretUp className="mr-1 w-4 h-4 text-emerald-700" /> +0,91 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          LVMH <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-0,58 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          VALLOUREC <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-1,22 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          STELLANTIS N.V. <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-1,45 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          TOTALENERGIES SE <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-1,60 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          VIRIDIEN <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-2,31 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          UBISOFT ENTERTAINMENT <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-12,90 %</span>
        </div>
        <div className='p-1 whitespace-nowrap flex items-center'>
          GAMESTOP CORP. <span className="ml-1 flex items-center"><FaCaretDown className="mr-1 w-4 h-4 text-red-600" />-18,87 %</span>
        </div>
      </div>
    </div>
  );
};

export default AlmFooter;
