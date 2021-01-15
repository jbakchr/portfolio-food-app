const Sequelize = require("sequelize");

const DB_PASS = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "Esmun";
const HOST = process.env.DB_HOST ? "localhost" : "db";

console.log("password:", DB_PASS);
console.log("host:", HOST);

const db = new Sequelize("foodapp", "root", DB_PASS, {
  host: HOST,
  dialect: "mysql",
});

module.exports = db;
