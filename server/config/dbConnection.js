import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const connectionDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGOOSE_URI || "mongodb://127.0.0.1:27017/lms"
    );

    if (connection) {
      console.log(`Connected to MongoDB:${connection.host}`);
    }
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

export default connectionDB;
