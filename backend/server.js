require("dotenv").config();
const express = require("express");

const db = require("./db/db");

const PORT = 5000;

const app = express();

app.get("/", (req, res, next) => {
  res.json({ msg: "You made it" });
});

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
