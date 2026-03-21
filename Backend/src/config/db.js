import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

const MAX_RETRY_ATTEMPTS = 3;
let retryCount = 0;

export const connectDB = async () => {
  if (!env.MONGO_URI) {
    logger.warn("MONGO_URI is missing. Running backend in mock mode (no persistent DB).");
    return;
  }

  if (
    env.MONGO_URI.includes("<username>") ||
    env.MONGO_URI.includes("<password>") ||
    env.MONGO_URI.includes("<cluster>") ||
    env.MONGO_URI.includes("<database>")
  ) {
    logger.warn("MONGO_URI is a template placeholder. Running backend in mock mode.");
    return;
  }

  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      retryWrites: true
    });
    logger.info("✅ MongoDB connected successfully");
    retryCount = 0;
  } catch (error) {
    retryCount++;
    if (retryCount < MAX_RETRY_ATTEMPTS) {
      logger.warn(`[Attempt ${retryCount}/${MAX_RETRY_ATTEMPTS}] MongoDB connection failed. Retrying...`);
      setTimeout(() => connectDB(), 3000);
    } else {
      logger.warn(`MongoDB connection failed after ${MAX_RETRY_ATTEMPTS} attempts. Running in mock/memory mode.`);
      logger.warn(`Reason: ${error.message}`);
      logger.info("💡 Tip: Update MONGO_URI in .env with valid MongoDB Atlas credentials to enable persistence.");
    }
  }
};
