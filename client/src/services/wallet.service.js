const { default: api } = require("./api");

const getBalance = () => {
  return api.get("/wallet/balance");
};

const sendMoney = data => {
  return api.post("/wallet/send", data);
};

module.exports = {
  getBalance,
  sendMoney,
};
