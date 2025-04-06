import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import cropSoilData from "../services/cropSoilData.js";

const cropSoil = cropSoilData();

export const getRecomendedCrops = asyncHandler(async (req, res, next) => {
  const API_KEY = "06f75d2a642e7cbfe65fcd9547f619c0";
  const cityInput = req.params.district || "Dhanbad";
  const stateInput = req.params.state || "Jharkhand";
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
  );
  console.log(data);
  const { N, P, K, ph } = await cropSoil.getDataByState(stateInput);
  const temperature = data.main.temp;
  const humidity = data.main.humidity;

  console.log(`N: ${N}, P: ${P}, K: ${K}, ph: ${ph}`);
  console.log(`Temperature: ${temperature}, Humidity: ${humidity}`);

  const recommendedCrops = await axios.get(`http://127.0.0.1:5000/top-ten-crops?N=${N}&P=${P}&K=${K}&pH=${ph}&temp=${temperature}&humidity=${humidity}`);



  res.status(200).json({
    success: 200 <= 400,
    data: recommendedCrops.data,
    message: "Weather data fetched",
  });
});
