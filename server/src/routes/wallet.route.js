const { Router } = require("express");
const { getbalance, sendMoney } = require("../controllers/wallet.controller");
const { isAuthenticated } = require("../middleware/auth.middleware");

const walletRouter = Router();
walletRouter.get("/balance", isAuthenticated, getbalance);
walletRouter.post("/send", isAuthenticated, sendMoney);


module.exports = walletRouter;
