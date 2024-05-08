import { IoMdArrowDropupCircle } from "react-icons/io";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const SwapHeader = () => {
    return ( 
        <div className="w-full flex space-x-4 p-2">
              <div className="w-full flex flex-col space-y-2 rounded">
                <h5 className="text-[10px] font-bold text-center bg-algoMarron text-white p-2 rounded flex justify-center items-center">
                  Offers <IoMdArrowDropupCircle className="h-4 w-4 ml-2" />
                </h5>
              </div>
              <div className="w-full flex flex-col space-y-2 rounded">
                <h5 className="text-[10px] font-bold text-center bg-algoOrange text-white p-2 rounded flex justify-center items-center">
                  Demands <IoMdArrowDropdownCircle className="h-4 w-4 ml-2" />
                </h5>
              </div>
            </div>
     );
}
 
export default SwapHeader;