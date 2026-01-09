const dotenv = require("dotenv");
dotenv.config();
const email = process.env.SMTP_EMAIL;
const password = process.env.SMTP_PASSWORD;
const secret_key = process.env.SECRET_KEY;
const refresh_key = process.env.REFRESH_KEY;
const client_url = process.env.CLIENT_URL;
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT || 27017;
const SSL = process.env.SSL === "require"; // convert to boolean

module.exports = {
  email,
  password,
  secret_key,
  refresh_key,
  client_url,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_NAME,
  DB_HOST,
  SSL,
};
