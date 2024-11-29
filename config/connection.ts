import mongoose from 'mongoose';

//load env file
process.loadEnvFile();
// connection string
const connectionURI =
  process.env.DB_URI ?? 'mongodb://localhost:27017/animeflix';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB');
    const client = await mongoose.connect(connectionURI);
    console.log('connectDB, Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('connectDB, Connection fail:', error);
    process.exit(1); // stop the application
    return null;
  }
};

export default connectDB;
