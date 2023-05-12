const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user");
const mongoose = require("mongoose");

require("dotenv").config();
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const mongoDb = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_CLT}.52v3llk.mongodb.net/${process.env.DB_CLT}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.listen(process.env.PORT, () =>
  console.log(`app listening on http://localhost:${process.env.PORT}`)
);
