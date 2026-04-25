const express = require("express");
const app = express();
const userRoutes = require("./src/routes/user.routes");
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", userRoutes);

module.exports = app;
