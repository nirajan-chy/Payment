const { Transaction: SequelizeTransaction } = require("sequelize");
const { postgres } = require("../config/postgres.db");
const Ledger = require("../models/ledger.model");
const Transaction = require("../models/transition.model");
const { Wallet } = require("../models/wallet.model");
const { v4: uuidv4 } = require("uuid");
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
    const { toUserId, amount } = req.body;
    if (!toUserId || Number(amount) <= 0)
      return res.status(400).json({
        message: "invalid amount ",
      });
    await postgres.transaction(async t => {
      const userId = req.user.id;

      const senderWallet = await Wallet.findOne({
        where: { userId },
        transaction: t,
        lock: SequelizeTransaction.LOCK.UPDATE,
      });

      if (!senderWallet)
        return res.status(404).json({ message: "Sender wallet not found" });

      if (senderWallet.status === "frozen")
        return res.status(400).json({ message: "Wallet is frozen" });

      if (Number(senderWallet.balance) < Number(amount))
        return res.status(400).json({ message: "insufficient balance" });

      const receiverWallet = await Wallet.findOne({
        where: { userId: toUserId },
        transaction: t,
        lock: SequelizeTransaction.LOCK.UPDATE,
      });

      if (!receiverWallet)
        return res.status(404).json({ message: "Receiver wallet not found" });

      senderWallet.balance = (
        Number(senderWallet.balance) - Number(amount)
      ).toFixed(2);
      receiverWallet.balance = (
        Number(receiverWallet.balance) + Number(amount)
      ).toFixed(2);

      await senderWallet.save({ transaction: t });
      await receiverWallet.save({ transaction: t });

      const tx = await Transaction.create(
        {
          reference: uuidv4(),
          fromWalletId: senderWallet.id,
          toWalletId: receiverWallet.id,
          amount: Number(amount),
          type: "transfer",
          status: "success",
        },
        { transaction: t }
      );

      await Ledger.bulkCreate(
        [
          {
            walletId: senderWallet.id,
            transactionId: tx.id,
            amount: -Number(amount),
            balanceAfter: senderWallet.balance,
          },
          {
            walletId: receiverWallet.id,
            transactionId: tx.id,
            amount: Number(amount),
            balanceAfter: receiverWallet.balance,
          },
        ],
        { transaction: t }
      );
    });

    res.json({ message: "Money sent successfully" });
  } catch (error) {
    res.status(500).json({
      message: "This is send money" + error.message,
    });
  }
};
