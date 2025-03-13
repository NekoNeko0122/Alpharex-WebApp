const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const { handler } = require("@netlify/functions");

const app = express();
const port = 3000;
app.set("views", path.join(__dirname, "public", "views"));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/webmain", (req, res) => {
  res.render("webmain.html");
});

// app.get("/contact", (req, res) => {
//   res.render("contact.ejs");
// });

exports.handler = async (event, context) => {
  return handler(app)(event, context); // Wrapping Express app with handler
};