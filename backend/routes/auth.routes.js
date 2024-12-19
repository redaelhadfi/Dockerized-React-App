const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middlewares/verifySignUp");
const { signup, signin, signout } = require("../controllers/auth.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Route for user registration
  app.post(
    "/api/auth/signup",
    [checkDuplicateUsernameOrEmail, checkRolesExisted],
    signup
  );

  // Route for user login
  app.post("/api/auth/signin", signin);

  // Route for user logout
  app.post("/api/auth/signout", signout);
};
