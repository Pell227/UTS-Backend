const dotenv = require("dotenv");

process.env.NODE_ENV = (
  process.env.NODE_ENV || "development"
).toLocaleLowerCase();

const envFound = dotenv.config({ path: ".env" });
if (envFound.error) {
  console.warn("File '.env' not found!");
}

module.exports = {
  env: process.env.NODE_ENV,
  api: {
    prefix: "/api",
  },

  port: process.env.PORT || 3200,
  database: {
    connection: process.env.DB_CONNECTION,
    name: process.env.DB_NAME,
  },
};
