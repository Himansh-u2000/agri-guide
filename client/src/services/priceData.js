import { asyncHandler } from "../utils/asyncHandler";
import axios from "../utils/Axios";

const priceData = () => {
  const getPriceData = asyncHandler(async (district = "Narmada") => {
    const {data} = await axios(`/price-trends?district=${district}`);

    if(data.success) {
      return data.data.priceTrends;
    }
  });

  return {
    getPriceData,
  };
};


export default priceData;