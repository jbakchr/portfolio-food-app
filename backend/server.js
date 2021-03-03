require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Routes
const searchWordRoute = require("./routes/search-word-route");
const recipeRoute = require("./routes/recipe-route");
const authRoute = require("./routes/auth-route");
const userRoutes = require("./routes/user-routes");

// DB
const db = require("./db/db");
const dbSeeding = require("./db/dbSeeding");

const PORT = 5000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware routes
app.use("/api/search-words", searchWordRoute);
app.use("/api/recipes", recipeRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoutes);

db.sync({ force: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
      dbSeeding();
    });
  })
  .catch((err) => console.log(err));
