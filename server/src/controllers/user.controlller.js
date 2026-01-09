const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({
        message: "Please fulfil required elements",
      });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    if (!user)
      return (400).json({
        message: "user not found ",
      });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
