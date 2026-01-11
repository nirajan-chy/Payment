const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

const Transaction = require("../models/transition.model");
const Ledger = require("../models/ledger.model");
const { Wallet } = require("../models/wallet.model");

exports.createTransaction = async ({
  senderWallet,
  receiverWallet,
  amount,
  t,
}) => {
  console.log(senderWallet);
  if (!senderWallet || !receiverWallet) {
    throw new Error("Wallets are required to create transaction");
  }

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

  return tx;
};

exports.getTransactions = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const wallet = await Wallet.findOne({
      where: { userId },
    });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    const transactions = await Transaction.findAll({
      where: {
        [Op.or]: [{ fromWalletId: wallet.id }, { toWalletId: wallet.id }],
      },
      order: [["createdAt", "DESC"]],
    });

    return res.json({ transactions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
