const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");

app.use(express.json());
var mongoDB = process.env.MONGODB_URL;

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.listen(3000);
app.use(authRoute);
