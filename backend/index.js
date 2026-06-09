import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`⚙️  Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed:", err);
    process.exit(1);
  });
