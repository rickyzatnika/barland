import mongoose from "mongoose";

const RidersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    kis: {
      type: String,
      required: true,
    },
    nik: {
      type: String,
      required: true,
    },
    numberStart: {
      type: Number,
      required: true,
    },
    raceClass: [
      {
        name: { type: String, required: true },
        price: { type: Number },
      },
    ], // Mengubah menjadi array of strings
    img: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
const Riders = mongoose.model("Riders", RidersSchema);

export default Riders;
