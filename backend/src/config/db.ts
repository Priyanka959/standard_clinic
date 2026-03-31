import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/dermaclinic';
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error instanceof Error ? error.message : 'Unknown Database Error'}`);
    console.warn('⚠️ Server is running without MongoDB connection. Database operations will fail.');
    // process.exit(1); // Commented out to prevent crash if MongoDB isn't running locally
  }
};

export default connectDB;