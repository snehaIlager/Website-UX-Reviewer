import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  url: { type: String, required: true },
  review: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Review", ReviewSchema);