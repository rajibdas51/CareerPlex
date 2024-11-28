import mongoose from 'mongoose';

let isConnected = false; // Track the connection state

export async function connectDb() {
  if (isConnected) {
    console.log('Database is already connected');
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI environment variable is not defined');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    isConnected = connection.connections[0].readyState === 1; // Check if connected
    console.log('Database connected successfully');
  } catch (error: any) {
    console.error('Database connection failed:', error.message);
    throw new Error('Failed to connect to the database');
  }
}
