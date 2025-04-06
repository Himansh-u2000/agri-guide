import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getRecomendedCrops = asyncHandler(async (req, res, next) => {
  const API_KEY = "06f75d2a642e7cbfe65fcd9547f619c0";
  const cityInput = req.query.city || "Dhanbad";
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_KEY}&units=metric`
  );
  console.log(data);
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
