const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { Wallet } = require("../models/wallet.model");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({
        message: "Please fulfil required elements",
      });
    const exist = await User.findOne({ where: { email } });
    if (exist)
      return res.status(400).json({
        message: "Email already exist ",
      });
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });
    if (!user)
      return (400).json({
        message: "user not found ",
      });

    await Wallet.create({
      userId: user.id,
    });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({
        message: "user not found ",
      });
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const token = generateToken(user.id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
