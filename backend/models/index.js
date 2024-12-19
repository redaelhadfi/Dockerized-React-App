const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

// Initialize Sequelize instance
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: false, // Disable SQL query logs (enable if debugging is needed)
});

const db = {};

// Attach Sequelize instance and models to the `db` object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);

// Define Many-to-Many relationship between User and Role
db.role.belongsToMany(db.user, {
  through: "user_roles", // Join table
  foreignKey: "roleId", // Foreign key in user_roles table
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles", // Join table
  foreignKey: "userId", // Foreign key in user_roles table
  otherKey: "roleId",
});

// Define available roles
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
