import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    // Connect to the MongoDB database
    const { connection } = await mongoose.connect(MONGODB_URI as string);

    // Check if the connection is successful
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    } else {
      // If the connection is not successful, return an error
      return Promise.reject(new Error("Failed to connect to the database."));
    }
  } catch (error) {
    console.error(error);

    // If there is an error, return the error
    return Promise.reject(error);
  }
};
