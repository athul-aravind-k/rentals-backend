const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401);
    res.json({
      ErrorMessage: "Authentication Failed",
    });
  }
};

module.exports = authenticate;
