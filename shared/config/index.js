const { config } = require("dotenv");
config();

const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || "localhost";
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  pwd: process.env.DB_PWD,
};

module.exports = { dbConfig, port, hostname };
