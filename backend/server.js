const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./models");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sync Database
db.sequelize
  .sync({ alter: true }) // Use `alter` instead of `force` for non-destructive sync in production
  .then(() => {
    console.log("Database connected and models synchronized.");
    initializeRoles(); // Initialize roles only once
  })
  .catch((err) => {
    console.error("Failed to sync database:", err.message);
  });

// Initialize default roles in the database
const initializeRoles = async () => {
  try {
    const count = await db.role.count(); // Check if roles already exist
    if (count === 0) {
      await db.role.bulkCreate([
        { id: 1, name: "user" },
        { id: 2, name: "moderator" },
        { id: 3, name: "admin" },
      ]);
      console.log("Default roles added to the database.");
    } else {
      console.log("Roles already initialized.");
    }
  } catch (err) {
    console.error("Error initializing roles:", err.message);
  }
};

// Routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// Root Endpoint
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Start the Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
