// index.js
// if for automatic deployement purpose.
if (process.env.NODE_MODE !== "production") {
  require("dotenv").config({
    path: `${__dirname}/.env`
  });
}

const express = require("express");
const cors = require("cors");
const apiRoute = require("./src/routes/api");
const { db } = require("./src/database/database");
const suppliers = require("./src/routes/suppliers");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/", apiRoute);
app.use("/suppliers", suppliers);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Upps something went wrong");
});

app.listen(port, () => {
  db.connect();
  console.log(`Listening on http://localhost:${port}`);
});
