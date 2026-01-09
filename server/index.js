const express = require("express");
const dotenv = require("dotenv");
const { testPostgresConnection } = require("./src/config/postgres.db");
const userRouter = require("./src/routes/user.route");
dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

// function call
testPostgresConnection();

//Router
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
