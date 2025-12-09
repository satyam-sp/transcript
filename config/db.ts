import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      maxPoolSize: Number(process.env.DB_POOL_SIZE) || 10
    });
    console.log("✅ MongoDB Connected");
  } catch (err: any) {
    console.error("MongoDB Error", err.message);
  }
};

export default connectDB;
