import PriceTrends from "../models/priceTrends.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { priceTrends } from "../services/priceTrends.service.js";
import searchSortFilter from "../utils/searchSortFilter.js";

export const createPriceTrends = asyncHandler(async (req, res, next) => {
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

  await PriceTrends.insertMany(pricetrends);

  res
    .status(201)
    .json(new ApiResponse(201, pricetrends, "Price trends created"));
});

export const getPriceTrends = asyncHandler(async (req, res, next) => {
  const { searchQuery, skip, limit, sort } = await searchSortFilter(
    req.query || {},
    "district"
  );

  console.log(req.query)
  
  const priceTrendsData = await PriceTrends.find({...searchQuery, district: req.query.district})
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await PriceTrends.countDocuments(searchQuery);

  res
    .status(200)
    .json(new ApiResponse(200, { priceTrends: priceTrendsData, total }, "Price trends fetched"));
});
