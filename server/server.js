// imports
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
// for connecting database new change
const connection = require("./db");
const authRoutes = require("#routes/auth-routes.js");
const userRoutes = require("#routes/user-routes.js");

// for getting Date for console and log file
const { newDate } = require("#utils/newDate.js");

// connecting to database
connection();

// Variables
const PORT = process.env.PORT || 8080;
const whitelist = process.env.FRONT_URL;
const IS_DEVELOPMENT = process.env.IS_DEVELOPMENT === "true";

const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200, // For legacy browser support
  credentials: true,
  methods: "GET, POST",
  contentType: "application/json",
};

// middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// route to update the server and client
morgan.token("date", newDate);
app.use(
  morgan(
    `[:date[clf]] ":method :url" :status :res[content-length]b :response-time ms`
  )
);

// set routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// listening to port
try {
  app.listen(PORT, () => {
    console.log(`listening on port ${PORT}  Date: ${newDate()}`);
  });
} catch (err) {
  console.log(err);
}
