import jwt from "jsonwebtoken";
import User from "../models/User.js";


 const protectRoute = async(req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No authentication token,access denied" });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return res.status(401).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};


export default protectRoute;