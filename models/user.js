const mongoose = require("mongoose");
const schema = mongoose.schema;
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
