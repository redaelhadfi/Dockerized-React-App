const dotenv = require("dotenv");

// Load environment variables based on the environment
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });
console.log("envFile: ", envFile);
module.exports = {
  secret: process.env.JWT_SECRET || "default_secret_key",
  jwtExpiration: 86400, // 24 hours in seconds
  jwtRefreshExpiration: 604800, // 7 days in seconds (for refresh tokens, if used)
};
