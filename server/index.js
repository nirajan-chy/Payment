const express = require("express");
const dotenv = require("dotenv");
const { testPostgresConnection } = require("./src/config/postgres.db");
const userRouter = require("./src/routes/user.route");
const walletRouter = require("./src/routes/wallet.route");
const transactionRouter = require("./src/routes/transaction.route");
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// function call
testPostgresConnection();

//Router
app.use("/user", userRouter);
app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
