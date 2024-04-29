const SpreadHeader = () => {
    return ( 
        <ul className="flex w-full text-xs">
            <li className="flex-1 text-center">Isin</li>
            <li className="flex-1 text-center">Bid</li>
            <li className="flex-1 text-center">Ask</li>
            <li className="flex-1 text-center">Quantity</li>
            <li className="flex-1 text-center">Order</li>
            <li className="flex-1 text-center">Type</li>
            <li className="flex-1 text-center">Validity</li>
            <li className="flex-1 text-center">Attractive</li>
        </ul>
     );
}
 
export default SpreadHeader;