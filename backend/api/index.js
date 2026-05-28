const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.json({ message: "Backend working on Vercel 🚀" });
});

// CHALLENGES API example
app.get("/api/challenges", (req, res) => {
  res.json([]);
});

module.exports = app;
