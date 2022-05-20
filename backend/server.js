const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
require("dotenv").config();
const mongo = require("./database/mongo");
const userRoutes = require("./routes/users-routes");
const watchListRoutes = require("./routes/watchlist-routes");

app.use(bodyParser.json());
app.use(cors());

mongo.connect();

app.use("/api/user", userRoutes);
app.use("/api/list", watchListRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../frontend/build/"),
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found :(" });
});

app.listen(process.env.PORT || 5000);
