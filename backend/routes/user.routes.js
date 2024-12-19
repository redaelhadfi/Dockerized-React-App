const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const { allAccess, userBoard, adminBoard, moderatorBoard } = require("../controllers/user.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Public route accessible to anyone
  app.get("/api/test/all", allAccess);

  // User route (requires login)
  app.get("/api/test/user", [verifyToken], userBoard);

  // Admin route (requires admin role)
  app.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);

  // Moderator route (requires moderator role)
  app.get("/api/test/mod", [verifyToken, isModerator], moderatorBoard);
};
