const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./src/api/api.router");
require("./src/utils/db.connect");

// Here we are using cors to access the APIs over cross origins
app.use(cors());

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use("/api/v1", apiRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Twitter Helpdesk API Server!");
});

app.listen(PORT, () => {
  console.log(`Twitter Helpdesk API Server is running on ${PORT}`);
});
