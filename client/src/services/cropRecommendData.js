import { asyncHandler } from "../utils/asyncHandler";
import axios from "../utils/Axios";

const cropRecommendData = () => {
  const getPriceData = asyncHandler(async (state, district) => {
    const { data } = await axios.get(`/recommended-crops/${state}/${district}`);

    if (data.success) {
      return data.data;
    }
  });
  return {
    getPriceData,
  };
};

export default cropRecommendData;
