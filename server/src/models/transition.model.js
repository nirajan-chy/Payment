const { DataTypes } = require("sequelize");
const { postgres } = require("../config/postgres.db");

const Transaction = postgres.define(
  "Transaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fromWalletId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    toWalletId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("credit", "debit", "transfer"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "success", "failed"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Transaction;
