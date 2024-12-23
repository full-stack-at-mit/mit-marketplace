// here, put all routes related to authentication

// imports
const { Router } = require("express");
const {
  getUsers,
  register,
  login,
  protected,
  logout,
  updateProfile,
} = require("../controllers/auth");
const { registerValidation, loginValidation } = require("../validators/auth");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");
const { userAuth } = require("../middlewares/auth-middleware");

const router = Router();

router.get("/get-users", getUsers);
router.get("/protected", userAuth, protected);
router.post("/register", registerValidation, validationMiddleware, register);
router.post("/login", loginValidation, validationMiddleware, login);
router.post("/logout", logout);
router.put("/profile", userAuth, updateProfile);

module.exports = router;
