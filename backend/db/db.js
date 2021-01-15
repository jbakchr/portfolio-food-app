const Sequelize = require("sequelize");

console.log(process.env);

const db = new Sequelize("foodapp", "root", "Esmun", {
  host: "db",
  dialect: "mysql",
});

module.exports = db;
