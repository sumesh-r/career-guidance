const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;
const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT === "true";

let secureAndSameSite = {};

if (!IS_DEVELOPMENT) {
  secureAndSameSite = {
    httpOnly: true, //accessible only by web server
    secure: true, //https
    sameSite: "None", //cross-site cookie
  };
}

// * this function will run when a student tries to login

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // * checking if all three values are available
  if (!email || !password) {
    return res
      .status(401)
      .json({ eMessage: "need email and password", path: "user" });
  }

  // * find the user if available
  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ eMessage: "user not found", path: "user" });
  }

  // * Check if the password are correct
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res
      .status(400)
      .json({ eMessage: "Invalid Credential", path: "user" });
  }

  // * Generating Token
  const accessToken = jwt.sign({ id: String(user.email) }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  // Create secure cookie with refresh token
  res.cookie("token", accessToken, {
    ...secureAndSameSite,
    maxAge: 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // * Defining the data which has to be return to the user
  user.password = "NaN";

  return res.status(200).json({ ...user });
};

const userLogout = async (req, res) => {
  // * Checking if token exists and Getting the token from cookie

  res.clearCookie("token").json({ message: "logged out" });
};

module.exports = {
  userLogin,
  userLogout,
};
