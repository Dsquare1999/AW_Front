const SwapRow = () => {
  return (
    <div className="flex space-x-4">
      <div className="w-full flex flex-col space-y-2 rounded border p-2">
        <h5 className="text-[10px] font-bold text-left">ISIN</h5>
        <div className="flex space-x-2 text-[10px]">
          <span>Quantity</span>
          <span>Rdt%</span>
          <span>Duration</span>
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2 rounded border p-2">
        <h5 className="text-[10px] font-bold text-right">ISIN</h5>
        <div className="flex space-x-2 text-[10px]">
          <span>Quantity</span>
          <span>Rdt%</span>
          <span>Duration</span>
        </div>
      </div>
    </div>
  );
};

export default SwapRow;
