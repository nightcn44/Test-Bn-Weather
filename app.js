const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { readdirSync } = require("fs");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json({ limit: "10mb" }));
app.use(morgan("dev"));
app.use(cors());

app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong" });
});

readdirSync("./routes").map((i) => {
  try {
    app.use("/api", require("./routes/" + i));
    console.log(`Loading route: ${i}`);
  } catch (err) {
    console.log(`Error loading route ${i}:`, err);
  }
});

module.exports = app;
