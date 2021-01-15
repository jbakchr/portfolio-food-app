require("dotenv").config();
const express = require("express");

const db = require("./db/db");
const searchWordRoute = require("./routes/search-word-route");

const PORT = 5000;

const app = express();

// Routes
app.use("/api/search-words", searchWordRoute);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
