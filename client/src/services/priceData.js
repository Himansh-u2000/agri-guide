import { asyncHandler } from "../utils/asyncHandler";
import axios from "../utils/Axios";

const priceData = () => {
  const getPriceData = asyncHandler(async (district = "Narmada") => {
    const { data } = await axios.get(`/price-trends?district=${district}`);

    if (data.success) {
      return data.data.priceTrends;
    }
  });

  const getState = asyncHandler(async () => {
    const { data } = await axios.get("/price-trends/state");

    if (data.success) {
      return data.data.states;
    }
  });

  const getDistrict = asyncHandler(async (state) => {
    if (!state) return;
    const { data } = await axios.get(`/price-trends/district/${state}`);

    if (data.success) {
      return data.data.districts;
    }
  });
  return {
    getPriceData,
    getState,
    getDistrict,
  };
};

export default priceData;
