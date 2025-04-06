import { ApiError } from "../utils/ApiError.js";

import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

const crop_data = [];
const csvFilePath = path.resolve("./src/services/crop_data.csv");

fs.createReadStream(csvFilePath)
  .pipe(csvParser())
  .on("data", (row) => crop_data.push(row))
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

const cropSoilData = () => {
  const getDataByState = async (state) => {
    const stateData = crop_data.find(
      (data) => data.STATE.toLowerCase() === state.toLowerCase()
    );

    if (!stateData) {
      throw new ApiError(404, "State data not found");
    }

    return {
      N: stateData.N_SOIL,
      P: stateData.P_SOIL,
      K: stateData.K_SOIL,
      ph: stateData.ph,
    };
  };

  return { getDataByState };
};

export default cropSoilData;
