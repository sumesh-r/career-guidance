// imports
const router = require("express").Router();
require("dotenv").config();
const {
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("#controllers/userControllers.js");
// for checking authentication
const { checkUserAuth } = require("#utils/middlewares.js");

//  route - /api/user...
router.post("/add", addUser);
router.post("/get", getUser);
router.post("/update", updateUser);
router.post("/delete", deleteUser);

module.exports = router;
