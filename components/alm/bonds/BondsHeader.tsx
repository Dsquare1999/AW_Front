const BondsHeader = () => {
    return ( 
        <ul className="flex justify-between w-full text-[10px]">
            <li className="flex-1 text-center">Outstanding</li>
            <li className="flex-1 text-center">Value Date</li>
            <li className="flex-1 text-center">Due Date</li>
            <li className="flex-1 text-center">Facial Rate</li>
            <li className="flex-1 text-center">Refund</li>
            <li className="flex-1 text-center">Period</li>
            <li className="flex-1 text-center">Type</li>
        </ul>
     );
}
 
export default BondsHeader;