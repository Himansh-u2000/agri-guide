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

  res.status(200).json({
    success: 200 <= 400,
    data: {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weather: data.weather[0].description,
    },
    message: "Weather data fetched",
  });
});
