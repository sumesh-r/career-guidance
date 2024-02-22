const router = require("express").Router();
require("dotenv").config();
const {
  userLogin,
  userLogout,
} = require("#controllers/authControllers.js");

// route - /api/auth...
router.post("/user/login", userLogin);
router.post("/user/logout", userLogout);

module.exports = router;