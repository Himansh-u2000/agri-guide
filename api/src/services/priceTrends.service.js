import axios from "axios";
export const priceTrends = () => {
  const getData = async () => {
    const { data } = await axios.get(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645&offset=0&limit=all&format=csv&format=json"
    );

    return data;
  };

  return { getData };
};
