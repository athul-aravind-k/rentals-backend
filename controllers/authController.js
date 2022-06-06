const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
require("dotenv").config();

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    var newUser = new userModel({
      username: req.body.username,
      password: hashedPass,
    });
    newUser
      .save()
      .then((user) => {
        res.json({
          message: "User Added Successfully",
        });
      })
      .catch((error) => {
        res.json({
          ErrorMessage: "some error occurred",
          error: error,
        });
      });
  });
};

const login = (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;
  userModel.findOne({ username: username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({ error: err });
        }
        if (result) {
          let token = jwt.sign(
            { username: user.name },
            process.env.SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
          res.json({
            message: "successful",
            token,
          });
        } else {
          res.json({
            errorMessage: "error username or password",
          });
        }
      });
    } else {
      res.json({
        errorMessage: "error username or password",
      });
    }
  });
};

module.exports = {
  register,
  login,
};
