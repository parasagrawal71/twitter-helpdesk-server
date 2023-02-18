const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const apiRouter = require("./src/api/api.router");
require("./src/utils/db.connect");

const app = express();
const PORT = process.env.PORT || 6001;

app.use(bodyParser.json());
app.use(cors());
app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Twitter Helpdesk API Server!");
});

app.get("/health", (req, res) => {
  res.send("Active");
});

app.listen(PORT, () => {
  console.log(`Twitter Helpdesk API Server is running on ${PORT}`);
});

app.all("*", (req, res) => {
  sendErrorProd(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404),
    res
  );
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});
