import { priceTrends } from "../services/priceTrends.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

export const getState = asyncHandler(async (req, res, next) => {
  const data = await priceTrends().getData();
  const states = data.records.map((record) => {
    return {
      state: record.state,
    };
  });
  const uniqueStates = [...new Set(states.map((state) => state.state))];

  res
    .status(200)
    .json(new ApiResponse(200, { states: uniqueStates }, "States fetched"));
});

export const getDistrict = asyncHandler(async (req, res, next) => {
  const { state } = req.params;
  if (!state) {
    throw new ApiError(400, "State is required");
  }
  const data = await priceTrends().getData();
  const districts = data.records.map((record) => {
    return {
      state: record.state,
      district: record.district,
    };
  });
  const filteredDistricts = districts.filter(
    (district) => district.state.toLowerCase() === state.toLowerCase()
  );

  const uniqueDistricts = [
    ...new Set(filteredDistricts.map((district) => district.district)),
  ].map((district) => {
    return { district };
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { districts: uniqueDistricts, total: uniqueDistricts.length },
        "Districts fetched"
      )
    );
});

export const getPriceTrends = asyncHandler(async (req, res, next) => {
  const data = await priceTrends().getData();
  const pricetrends = data.records.map((record) => {
    return {
      state: record.state,
      district: record.district,
      market: record.market,
      commodity: record.commodity,
      variety: record.variety,
      arrival_date: record.arrival_date,
      min_price: record.min_price,
      max_price: record.max_price,
      modal_price: record.modal_price,
    };
  });

  const priceData = pricetrends.filter(
    (record) =>
      record.district.toLowerCase() === req.query.district.toLowerCase()
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { priceTrends: priceData, total: priceData.length },
        "Price trends fetched"
      )
    );
});
