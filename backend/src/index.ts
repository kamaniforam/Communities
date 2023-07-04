import app from "./api/app";
import dotenv from "dotenv";
import connectDB from "./api/config/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`server started on http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log("Unable to start server", error);
  });
