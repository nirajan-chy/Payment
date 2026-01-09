const { Router } = require("express");
const {
  register,
} = require("next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup");

const userRouter = Router();

userRouter.post("/register", register);

module.exports = userRouter;
