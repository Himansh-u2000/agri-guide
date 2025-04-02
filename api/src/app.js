import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));

// import routes
import priceTrendsRouter from "./routes/priceTrends.route.js";

// define routes
app.use("/api/v1/price-trends", priceTrendsRouter);

// app.use(express.static(path.join(__dirname, "../client", "/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
// });

app.use((err, req, res, next) => {
  console.log(err.message);
  return res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    data: null,
    message: err.message || "Internal Server Error",
    success: false,
  });
});

export default app;
