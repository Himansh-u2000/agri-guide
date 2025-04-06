import React, { useEffect, useState } from "react";
import Dropdown from "../../components/common/Dropdown";
import CropPieChart from "./CropPieChart ";
import priceData from "../../services/priceData";
import cropRecommendData from "../../services/cropRecommendData";

export default function CropAdvisor() {
  const [states, setStates] = useState([]);
  const [District, setDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [data, setData] = useState([]);
  console.log(data);
  const pricedata = priceData();
  const cropRecommend = cropRecommendData();

  const handleStateSelection = async (value) => {
    setSelectedState(value);
    handleDistrictSelection(value);
  };

  const handleDistrictSelection = async (value) => {
    setSelectedDistrict(value);
    handleSelection(selectedState, value);
  };

  const handleSelection = async (state, district) => {
    setLoading(true);
    const data = await cropRecommend.getPriceData(state, district);
    setData(data);
    setLoading(false);
  };

  const fetchStates = async () => {
    if (states.length > 0) return; // Prevent fetching if states are already populated
    const data = await pricedata.getState();
    const stateData = data.map((item) => {
      return { label: item, value: item };
    });
    setStates(stateData);
    const defaultState = stateData[0]?.value;
    setSelectedState(defaultState);
    handleDistrictSelection(defaultState); // Fetch districts for the default state
  };

  const fetchDistricts = async () => {
    const data = await pricedata.getDistrict(selectedState);
    const districtData = data.map((item) => {
      return { label: item.district, value: item.district };
    });
    setDistrict(districtData);
    const defaultDistrict = districtData[0]?.value;
    setSelectedDistrict(defaultDistrict);
    handleSelection(selectedState, defaultDistrict); // Fetch districts for the default state
  };

  useEffect(() => {
    fetchStates(); // Fetch states only once when the component mounts
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistricts(); // Fetch districts when the selected state changes
    }
  }, [selectedState]);

  // const recommendedCropReasons = [
  //   {
  //     name: "Rice",
  //     reason: [
  //       "Weather suits for rice cultivation",
  //       "Land is suitable for rice farming",
  //     ],
  //     img: "https://img.freepik.com/premium-vector/oryza-sative-plant-white-background-2d-vector-illustration_983286-4583.jpg?w=740",
  //     Percent: 35,
  //   },
  // ];

  const recommendedCropReasons = data ? data.map((item) => {
    return {
      name: item.crop,
      reason: [
        `K (potassium) is ${item.K} kg/ha`,
        `N (nitrogen) is ${item.N} kg/ha`,
        `P (phosphorus) is ${item.P} kg/ha`,
        `temperature is ${item.temperature} degree celsius`,
        `humidity is ${item.humidity} %`,
        `rainfall is ${item.rainfall} mm`,
      ],
      Percent: item.distance,
      img: "https://img.freepik.com/free-vector/corn-plant-growing-with-soil-cartoon_1308-100337.jpg",
    };
  }
  ) : [];

  return (
    <div className="bg-secondary">
      <form className="flex md:flex-row flex-col gap-4 p-4 max-w-7xl mx-auto">
        <Dropdown
          label={"Select State"}
          data={states}
          onChange={(e) => {
            handleStateSelection(e);
          }}
        />
        <Dropdown
          label={"Select District"}
          data={District}
          onChange={(e) => handleDistrictSelection(e)}
        />
      </form>

      <h1 className="text-center text-xl md:text-2xl font-bold text-primary-shade p-4">
        Smart Farming: The 4 Best Crops for Your Land & Climate!
      </h1>
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-8 max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2 col-span-1">
          <CropPieChart />
        </div>
        {recommendedCropReasons.map((crop, index) => (
          <div
            key={index}
            className="rounded-lg hover:shadow-2xl shadow-md bg-white md:min-h-[500px]"
          >
            <h1 className="text-xl font-semibold hover:cursor-pointer text-center p-4 rounded-t-lg bg-primary text-white">
              {crop.name.toUpperCase()} - {crop.Percent}%
            </h1>
            <div className="p-4">
              <img src={crop.img} alt="crop" className="w-40 h-40 mx-auto" />
              <div className="text-center">
                <h2 className="text-lg font-semibold">{crop.name}</h2>
                <h3 className="text-sm font-semibold">Reasons to grow</h3>
                <ul className="list-disc list-inside">
                  {crop.reason.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
