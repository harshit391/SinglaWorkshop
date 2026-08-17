import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const globalForMongoose = globalThis as unknown as {
  mongooseConn: typeof mongoose | undefined;
  mongoosePromise: Promise<typeof mongoose> | undefined;
};

export const connectDB = async () => {
  if (globalForMongoose.mongooseConn) {
    return globalForMongoose.mongooseConn;
  }

  if (!globalForMongoose.mongoosePromise) {
    globalForMongoose.mongoosePromise = mongoose.connect(MONGODB_URI);
  }

  globalForMongoose.mongooseConn = await globalForMongoose.mongoosePromise;
  return globalForMongoose.mongooseConn;
};
