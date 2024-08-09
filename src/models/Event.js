import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String },
    content: { type: String },
    imageUrl: { type: String },
    slug: { type: String },
    category: { type: String },
    url: { type: String },
    publishedAt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};
const Events = mongoose.model("Event", EventSchema);

export default Events;
