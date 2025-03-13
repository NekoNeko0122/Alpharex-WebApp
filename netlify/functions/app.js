const express = require("express");
const bodyParser = require("body-parser");

const { createHandler } = require("@netlify/functions");

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/webmain", (req, res) => {
  res.render("views/webmain.ejs");
});

// app.get("/contact", (req, res) => {
//   res.render("contact.ejs");
// });

exports.handler = createHandler(app);
