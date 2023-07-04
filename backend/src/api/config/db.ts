import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME || "communities";
const DB_HOST = process.env.DB_HOST || "127.0.0.1:27017";

const connectionString = `mongodb+srv://${DB_HOST}/${DB_NAME}`;

const connectDB = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(connectionString)
      .then((connection) => {
        console.log("MongoDB Connected", connection.connection.host);
        resolve();
      })
      .catch((error) => {
        console.log("MongoDB Connection Error", error);
        reject(error);
      });
  });
};

export default connectDB;
