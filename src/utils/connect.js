import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    throw new Error("Connection Failed!");
  }
};

export default connect;
