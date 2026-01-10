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
    unique: true,
  },
  balance: {
    type: DataTypes.DECIMAL(15, 2),
    defaultValue: 5000000,
  },
  status: {
    type: DataTypes.ENUM("active", "frozen"),
    defaultValue: "active",
  },
});

User.hasOne(Wallet, { foreignKey: "userId" });
Wallet.belongsTo(User, { foreignKey: "userId" });

module.exports = {
  Wallet,
};
