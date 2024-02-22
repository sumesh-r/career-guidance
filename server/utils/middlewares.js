const jwt = require("jsonwebtoken");
const { User } = require("#models/User.js");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT;

// middleware
//middleware function to check if the incoming request in authenticated:
const checkUserAuth = async (req, res, next) => {
  const token = req.cookies["token"];
  //send error message if no token is found:
  if (!token)
    return res.status(401).json({ eMessage: "Access denied, token missing!" });

  try {
    //if the incoming request has a valid token, we extract the payload from the
    //  token and attach it to the request object.
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    if (!Number(payload.id)) {
      return res.status(401).json({ eMessage: "unAuthorized" });
    }

    let user;
    try {
      user = await User.findOne({ email: payload.id });
    } catch (err) {
      return new Error(err);
    }
    if (!user) return res.status(401).json({ eMessage: "unAuthorized" });

    req.email = user.email;
    next();
  } catch (error) {
    // token can be expired or invalid. Send appropriate errors in each case:
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session timed out,please login again" });
    } else if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Invalid token,please login again!" });
    } else {
      //catch other unprecedented errors
      console.error(error);
      return res.status(400).json({ error });
    }
  }
};

module.exports = {
  checkUserAuth,
};
