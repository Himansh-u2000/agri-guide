import { useEffect, useState } from "react";
import Dropdown from "../common/Dropdown";
import PrimaryButton from "../common/PrimaryButton";
import CropLineChart from "./CropLineChart ";
import data from "../../data/state-districtData.json";
import priceData from "../../services/priceData";

export default function Hero({setPriceData}) {
  const [states, setStates] = useState([]);
  const [District, setDistrict] = useState([]);
  const [price, setPrice] = useState([]);

  const pricedata = priceData();

  useEffect(() => {
    const stateListSet = new Set();
    const districtListSet = new Set();

    data.forEach((item) => {
      stateListSet.add({ label: item.state, value: item.state });
      districtListSet.add({ label: item.district, value: item.district });
    });

    setStates(Array.from(stateListSet));
    setDistrict(Array.from(districtListSet));
    handleSelection();
  }, []);

  const handleSelection = async (value = "Narmada") => {
    const data = await pricedata.getPriceData(value);
    setPrice(data)
    setPriceData(data)
  };

  return (
    <div className="flex justify-evenly flex-col-reverse md:flex-row gap-4 p-4">
      <div className="flex flex-col p-4 gap-2">
        <Dropdown data={states} label="State" onChange={handleSelection} />
        <Dropdown data={District} label="District" onChange={handleSelection} />
        <PrimaryButton className="translate-x-2 md:w-md font-semibold">
          Submit
        </PrimaryButton>
      </div>
      <div className="md:w-1/2 w-full">
        <CropLineChart />
      </div>
    </div>
  );
}
