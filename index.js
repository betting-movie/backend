require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const db = require("./src/models/index");
const cors = require("cors");
const indexRouter = require("./routes/api");

app.locals.pluralize = require("pluralize");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
const memoryStore = new session.MemoryStore();

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
  return res.status(200).send({ msg: "Working" });
});

app.use("/api", indexRouter);

module.exports = app;
