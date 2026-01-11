const { Transaction: SequelizeTransaction } = require("sequelize");
const { postgres } = require("../config/postgres.db");
const Ledger = require("../models/ledger.model");
const Transaction = require("../models/transition.model");
const { Wallet } = require("../models/wallet.model");
const { v4: uuidv4 } = require("uuid");
const { default: loadConfig } = require("next/dist/server/config");
const { createTransaction } = require("./transaction.controller");

exports.getbalance = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;
    console.log("User ID from token:", userId);

    const wallet = await Wallet.findOne({
      where: { userId },
    });

    return res.json({
      balance: wallet ? wallet.balance : 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.sendMoney = async (req, res) => {
  try {
    const { toUserId, fromUserId, amount } = req.body;

    if (!toUserId || !fromUserId || !amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    // console.log("to:", toUserId);
    // console.log("from:", fromUserId);
    // console.log("amount:", amount);

    await postgres.transaction(async t => {
      const userId = req.user.id; 

      const senderWallet = await Wallet.findOne({
        where: { userId },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      const receiverWallet = await Wallet.findOne({
        where: { userId: toUserId },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      // Validate wallets
      if (!senderWallet) throw new Error("Sender wallet not found");
      if (!receiverWallet) throw new Error("Receiver wallet not found");
      if (senderWallet.status === "frozen")
        throw new Error("Sender wallet frozen");
      if (receiverWallet.status === "frozen")
        throw new Error("Receiver wallet frozen");
      if (Number(senderWallet.balance) < Number(amount))
        throw new Error("Insufficient balance");

      // Update balances
      senderWallet.balance -= Number(amount);
      receiverWallet.balance += Number(amount);

      await senderWallet.save({ transaction: t });
      await receiverWallet.save({ transaction: t });

      // CREATE TRANSACTION INSIDE the same transaction
      await createTransaction({ senderWallet, receiverWallet, amount, t });
    });
    res.status(200).json({
      message: "Money send successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "This is send money" + error.message,
    });
  }
};
