const Sequelize = require("sequelize");

const DB_PASSWORD = process.env.MYSQL_ROOT_PASSWORD
  ? "Esmun"
  : process.env.DB_PASSWORD;
const HOST = process.env.DB_HOST ? "localhost" : "db";

const db = new Sequelize("foodapp", "root", DB_PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

module.exports = db;
