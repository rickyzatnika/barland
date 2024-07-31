import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
const RaceClasses = mongoose.model("RaceClasses", ClassSchema);

export default RaceClasses;
