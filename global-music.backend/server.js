const express = require("express");
const glob = require("glob");
const partials = require("express-partials");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(partials());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cookieSession({
    name: "auth-session",
    keys: "ababba",
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

// Setup express routes
let routes = glob.sync(__dirname + "/routes/*.js");
for (let route of routes) {
  console.info("Loading route : " + route);
  require(route)(app);
}

app.listen(5000, () => {
  console.log("server started on port 5000");
});
