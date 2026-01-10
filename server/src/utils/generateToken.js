const jwt = require("jsonwebtoken");
const { secret_key } = require("../config/env");
const generateToken = userId => {
  return (token = jwt.sign({ id: userId }, secret_key, { expiresIn: "1h" }));
};

module.exports = generateToken;
