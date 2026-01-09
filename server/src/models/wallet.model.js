const { DataTypes } = require("sequelize");
const { postgres } = require("../config/postgres.db");
const User = require("./user.model");

const Wallet = postgres.define("wallet", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 0.0,
  },
});

User.hasOne(Wallet);
Wallet.belongsTo(User);

module.exports = {
  Wallet,
};
