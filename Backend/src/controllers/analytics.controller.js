import { buildAnalytics } from "../services/analytics.service.js";
import { asyncHandler } from "../middleware/error.middleware.js";

export const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await buildAnalytics(req.user._id);
  res.json(analytics);
});
