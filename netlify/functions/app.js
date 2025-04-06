const express = require("express");
const bodyParser = require("body-parser");
const { handler } = require("@netlify/functions");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/main", (req, res) => {
  res.render("webmain.html");
});

// app.get("/contact", (req, res) => {
//   res.render("contact.ejs");
// });



exports.handler = async (event, context) => {
  return handler(app)(event, context); // Wrapping Express app with handler
};