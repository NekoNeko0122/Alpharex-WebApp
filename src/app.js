import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/header", (req, res) => {
  res.render("header.ejs");
});

// app.get("/contact", (req, res) => {
//   res.render("contact.ejs");
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});