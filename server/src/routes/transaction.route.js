const { Router } = require("express");

const { isAuthenticated } = require("../middleware/auth.middleware");
const { getTransactions } = require("../controllers/transaction.controller");

const transactionRouter = Router();

transactionRouter.get("/tx", isAuthenticated, getTransactions);

module.exports = transactionRouter;
