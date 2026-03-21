import { verifyToken } from "../utils/token.js";
import User from "../models/User.js";
import { isDBConnected } from "../utils/mockData.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = verifyToken(token);

    if (!isDBConnected()) {
      // Mock mode: set a mock user
      req.user = {
        _id: decoded.userId,
        id: decoded.userId,
        name: "Demo User",
        email: "user@example.com"
      };
      return next();
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
