const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  console.log("Authorization Header:", authorizationHeader); // Debugging log

  if (!authorizationHeader) {
    console.error("No token provided in request headers.");
    return res.status(403).json({ message: "No token provided!" });
  }

  // Extract token from "Bearer <token>"
  const token = authorizationHeader.startsWith("Bearer ")
    ? authorizationHeader.slice(7, authorizationHeader.length)
    : authorizationHeader;

  console.log("Extracted Token:", token); // Debugging log

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message); // Debugging log
      return res.status(401).json({ message: "Unauthorized!" });
    }

    console.log("Token successfully verified. Decoded Payload:", decoded); // Debugging log
    req.userId = decoded.id; // Save user ID for future use
    next();
  });
};

const isAdmin = async (req, res, next) => {
  try {
    console.log("Checking admin role for user ID:", req.userId); // Debugging log

    const user = await User.findByPk(req.userId);
    if (!user) {
      console.error("User not found with ID:", req.userId); // Debugging log
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User found:", { id: user.id, username: user.username }); // Debugging log

    const roles = await user.getRoles();
    console.log("Roles for user:", roles.map((role) => role.name)); // Debugging log

    if (roles.some((role) => role.name === "admin")) {
      console.log("User has admin role. Access granted."); // Debugging log
      return next();
    }

    console.warn("Access denied. User does not have admin role."); // Debugging log
    return res.status(403).json({ message: "Require Admin Role!" });
  } catch (error) {
    console.error("Error in isAdmin middleware:", error.message); // Debugging log
    return res.status(500).json({ message: error.message });
  }
};

const isModerator = async (req, res, next) => {
  try {
    console.log("Checking moderator role for user ID:", req.userId); // Debugging log

    const user = await User.findByPk(req.userId);
    if (!user) {
      console.error("User not found with ID:", req.userId); // Debugging log
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User found:", { id: user.id, username: user.username }); // Debugging log

    const roles = await user.getRoles();
    console.log("Roles for user:", roles.map((role) => role.name)); // Debugging log

    if (roles.some((role) => role.name === "moderator")) {
      console.log("User has moderator role. Access granted."); // Debugging log
      return next();
    }

    console.warn("Access denied. User does not have moderator role."); // Debugging log
    return res.status(403).json({ message: "Require Moderator Role!" });
  } catch (error) {
    console.error("Error in isModerator middleware:", error.message); // Debugging log
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
};
