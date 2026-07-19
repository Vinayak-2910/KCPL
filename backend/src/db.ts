import mongoose from "mongoose";

export async function connectDB(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Connected → ${mongoose.connection.host}`);
  } catch (err) {
    console.error("[MongoDB] Connection failed:", err);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("[MongoDB] Runtime error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[MongoDB] Disconnected.");
  });
}
