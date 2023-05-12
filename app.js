const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger = require("morgan");
const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const router = require("./routes/router");

// Connect to MongoDB
const mongoDb = `mongodb+srv://${process.env.DB_USR}:${process.env.DB_PWD}@${process.env.DB_CLT}.52v3llk.mongodb.net/${process.env.DB_CLT}?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Passport authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(logger("dev"));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Access the user object from anywhere in our application
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

app.listen(process.env.PORT, () =>
  console.log(`app listening on http://localhost:${process.env.PORT}`)
);
