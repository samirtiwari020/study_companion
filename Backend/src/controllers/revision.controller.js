import Revision from "../models/Revision.js";
import { calculateNextRevisionDate } from "../services/revision.service.js";
import { asyncHandler } from "../middleware/error.middleware.js";

export const addRevision = asyncHandler(async (req, res) => {
  const { topic, confidence = 3 } = req.body;
  if (!topic) {
    res.status(400);
    throw new Error("Topic is required");
  }

  const revision = await Revision.create({
    user: req.user._id,
    topic,
    confidence,
    nextRevisionAt: calculateNextRevisionDate(confidence)
  });

  res.status(201).json(revision);
});

export const getRevisions = asyncHandler(async (req, res) => {
  const list = await Revision.find({ user: req.user._id }).sort({ nextRevisionAt: 1 });
  res.json(list);
});
