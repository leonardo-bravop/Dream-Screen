const express = require("express");
const routes = require("./routes");

const dotenv = require("dotenv");

const db = require("./config/db");
const User = require("./models/User");

const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const path = require("path");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport config
app.use(cookieParser());

app.use(sessions({ secret: "bootcamp" }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }
            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use("/api", routes);

// --------- deployment ---------------

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  //Check route
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

//Error middleware
app.use(function (err, req, res, next) {
  console.log(`en middlewareeeeeeeeeee -------------------`);
  console.error(err);
  // console.error(err, err.stack);
  // res.status(500)
  res.send({ error: err.message });
});

//db sync and server listening
const PORT = process.env.PORT || 8080;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
