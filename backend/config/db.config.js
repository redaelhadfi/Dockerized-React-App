const dotenv = require("dotenv");

// Load environment variables based on the environment
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

module.exports = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT || 3306,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5, // Maximum number of connections in the pool
    min: 0, // Minimum number of connections in the pool
    acquire: 30000, // Maximum time (ms) to try getting a connection before throwing error
    idle: 10000, // Maximum time (ms) a connection can be idle before being released
  },
};
