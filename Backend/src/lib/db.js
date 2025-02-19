import mongoose from "mongoose";

export const db = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`connected at ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
