const Sequelize = require("sequelize");

const db = new Sequelize("foodapp", "root", "Esmun", {
  host: "db",
  dialect: "mysql",
});

module.exports = db;
