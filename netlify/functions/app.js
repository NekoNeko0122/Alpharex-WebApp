const express = require("express");
const nodemailer = require('nodemailer');
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

app.get("/webmain", (req, res) => {
  res.render("webmain.html");
});

// app.get("/contact", (req, res) => {
//   res.render("contact.ejs");
// });

exports.handler = async (event, context) => {
  return handler(app)(event, context); // Wrapping Express app with handler
};


// Set up Nodemailer transport (use your email service credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // You can use other services like SendGrid, Mailgun, etc.
  auth: {
    user: 'alpharexsender@gmail.com', // Your email
    pass: '!Andrewed1'   // Your email password or app password (use environment variables for security)
  }
});

// Route to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'alpharexsender@gmail.com', // Sender address
    to: 'colocadoandrewed@gmail.com', // Recipient address (your email)
    subject: 'New Contact Form Submission', // Email subject
    text: `You have received a new message from the contact form:

    Name: ${name}
    Email: ${email}
    Message: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    res.status(200).json({ success: true, messageId: info.messageId });
  });
});