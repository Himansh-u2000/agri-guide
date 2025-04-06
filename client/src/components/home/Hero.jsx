import { useEffect, useState } from "react";
import priceData from "../../services/priceData";
import Dropdown from "../common/Dropdown";
import PrimaryButton from "../common/PrimaryButton";
import CropLineChart from "./CropLineChart ";

export default function Hero({ setPriceData }) {
  const [states, setStates] = useState([]);
  const [District, setDistrict] = useState([]);

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  console.log(data);

  const pricedata = priceData();

  // fetch all state data
  const handleStateSelection = async () => {
    setLoading(true);
    setStates([]);
    const data = await pricedata.getState();
    const stateData = data.map((item) => {
      return { label: item, value: item };
    });
    setStates(stateData);
  };

  useEffect(() => {
    handleStateSelection();
  }, []);

  // fetch all district data
  const handleDistrictSelection = async (value) => {
    const data = await pricedata.getDistrict(value);
    const districtData = data.map((item) => {
      return { label: item.district, value: item.district };
    });
    setDistrict(districtData);
    handleSelection(value);
  };

  useEffect(() => {
    if (states.length === 0) return;
    handleDistrictSelection(states[0]?.value);
  }, [states]);

  const handleSelection = async (value = "Narmada") => {
    const data = await pricedata.getPriceData(value);
    setPriceData(data);
    setData(data);
    setLoading(false);
  };

  return (
    <div className="flex justify-evenly flex-col-reverse md:flex-row gap-4 p-4">
      <div className="flex flex-col p-4 gap-2">
        <Dropdown
          data={states}
          label="State"
          onChange={(e) => {
            handleDistrictSelection(e);
          }}
        />
        <Dropdown
          data={District}
          label="District"
          onChange={(e) => {
            handleSelection(e);
          }}
        />
        <PrimaryButton className="translate-x-2 md:w-md font-semibold">
          Submit
        </PrimaryButton>
      </div>
      <div className="md:w-1/2 w-full">
        <CropLineChart cropData={data} />
      </div>
    </div>
  );
}
