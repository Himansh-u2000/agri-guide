import app from "./app.js";
import connectToDb from "./config/connectDB.js";
import { PORT } from "./constant.js";

connectToDb().then(() =>
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  })
);
