const db = require("../models");
const User = db.user;
const Role = db.role;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check username
    const usernameExists = await User.findOne({ where: { username: req.body.username } });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already in use!" });
    }

    // Check email
    const emailExists = await User.findOne({ where: { email: req.body.email } });
    if (emailExists) {
      return res.status(400).json({ message: "Email is already in use!" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    const roles = req.body.roles;
    const validRoles = await Role.findAll({ attributes: ["name"] });
    const validRoleNames = validRoles.map((role) => role.name);

    for (const role of roles) {
      if (!validRoleNames.includes(role)) {
        return res.status(400).json({ message: `Failed! Role does not exist: ${role}` });
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};
