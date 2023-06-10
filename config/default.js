import mongoose from "mongoose";

const connect = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDB connected at ${DB.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
