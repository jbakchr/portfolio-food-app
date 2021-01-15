require("dotenv").config();
const express = require("express");

// Routes
const searchWordRoute = require("./routes/search-word-route");

// DB
const db = require("./db/db");
const dbSeeding = require("./db/dbSeeding");

const PORT = 5000;

const app = express();

// Middleware routes
app.use("/api/search-words", searchWordRoute);

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
      dbSeeding();
    });
  })
  .catch((err) => console.log(err));
