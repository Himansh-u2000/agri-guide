import mongoose from "mongoose";

const priceTrendsSchema = new mongoose.Schema({
  state: { type: String },
  district: { type: String },
  market: { type: String },
  commodity: { type: String },
  variety: { type: String },
  arrival_date: { type: String },
  min_price: { type: Number },
  max_price: { type: Number },
  modal_price: { type: Number },
  date: { type: String, default: () => String(new Date().toISOString().split("T")[0]) },
});

const PriceTrends = mongoose.model("PriceTrends", priceTrendsSchema);

export default PriceTrends;
