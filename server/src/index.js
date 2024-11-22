const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const multer = require('multer');
require("./middlewares/passport-middleware");

// import our constants
const { PORT, CLIENT_URL } = require("./constants");

// import routes
const authRoutes = require("./routes/auth");

const productRoutes = require("./routes/products");

// initialize middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({ origin: CLIENT_URL, credentials: true }));

// initialize routes
app.use("/api", authRoutes);
app.use("/api", productRoutes);

// start the app
const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`App running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
