import mongoose from 'mongoose';
export function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Database connected successfully');
    });
    connection.on('error', (error) => {
      console.log('Database connection failed', error);
      console.log(error);
    });
  } catch (error) {
    console.log(error);
  }
}
