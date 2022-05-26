require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

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
app.use("/api", authRoute);
