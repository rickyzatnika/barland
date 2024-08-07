import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  publishedAt: { type: Date, required: true },
});

mongoose.models = {};
const Article = mongoose.model("Article", ArticleSchema);

export default Article;
