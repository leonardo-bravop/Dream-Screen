const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const db = require("./config/db");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(function (err, req, res, next) {
  console.error(err, err.stack);
  res.status(500).send(err);
});

const PORT = process.env.PORT || 8080;

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
