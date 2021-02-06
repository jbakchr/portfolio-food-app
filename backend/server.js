require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Routes
const searchWordRoute = require("./routes/search-word-route");
const recipeRoute = require("./routes/recipe-route");

// DB
const db = require("./db/db");
const dbSeeding = require("./db/dbSeeding");

const PORT = 5000;

const app = express();

// Middleware
app.use(cors());

// Middleware routes
app.use("/api/search-words", searchWordRoute);
app.use("/api/recipes", recipeRoute);

db.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
      dbSeeding();
    });
  })
  .catch((err) => console.log(err));
