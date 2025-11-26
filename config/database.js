import mongoose from "mongoose";

let isConnected = false; // Avoid multiple connections

const connectDb = async () => {
    if (isConnected) return; // already connected, skip

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDb;
