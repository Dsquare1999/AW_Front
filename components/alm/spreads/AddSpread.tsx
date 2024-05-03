'use client'

import AddSpreadForm from "./AddSpreadForm";
import Africa from "./africa";
import { useState } from "react";

interface AddSpreadsProps {}

const AddSpreads: React.FunctionComponent<AddSpreadsProps> = () => {

  const [countrySelected, setCountrySelected] = useState<string>("")

  const handleCountrySelect = (country: string) => {
    setCountrySelected(country)
  }

  return (
    
      <div className="flex justify-between items-center px-1 gap-1">
        <div>
          <Africa selectFn={handleCountrySelect} />
        </div>
        <div className="text-xs">
          <AddSpreadForm countrySelected={countrySelected} />
        </div>
      </div>
    
  );
};

export default AddSpreads;
