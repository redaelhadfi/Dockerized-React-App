const db = require("../models");
const User = db.user;

// Public content (accessible to anyone)
exports.allAccess = (req, res) => {
  res.status(200).json({
    message: "Welcome to the public API. This content is accessible to everyone.",
  });
};

// User-specific content (requires user role)
exports.userBoard = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "username", "email"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    
    }

    res.status(200).json({
      message: "User-specific content.",
      userDetails: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin-specific content (requires admin role)
exports.adminBoard = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "username", "email"],
    });

    res.status(200).json({
      message: "Admin-specific content.",
      userList: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Moderator-specific content (requires moderator role)
exports.moderatorBoard = async (req, res) => {
  try {
    const userCount = await User.count();

    res.status(200).json({
      message: "Moderator-specific content.",
      userCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
