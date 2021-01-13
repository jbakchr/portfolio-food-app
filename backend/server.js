const express = require("express");

const PORT = 5000;

const app = express();

app.get("/", (req, res, next) => {
  res.json({ msg: "You made it" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
