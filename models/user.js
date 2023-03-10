const mongoose = require("mongoose");
const schema = mongoose.schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

const user = mongoose.model("user", userSchema);
module.exports = user;
