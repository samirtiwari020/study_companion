import mongoose from "mongoose";

const revisionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    topic: { type: String, required: true },
    lastReviewedAt: { type: Date, default: Date.now },
    nextRevisionAt: { type: Date, required: true },
    confidence: { type: Number, default: 3, min: 1, max: 5 }
  },
  { timestamps: true }
);

const Revision = mongoose.model("Revision", revisionSchema);
export default Revision;
