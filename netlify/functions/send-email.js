const nodemailer = require('nodemailer');
require('dotenv').config();
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Only POST requests are allowed' }),
    };
  }

  // Parse the form data from the body
  const { name, email, message } = JSON.parse(event.body);

  // Create a transporter using Gmail (or any other email service)
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the email service you prefer
    auth: {
      user: process.env.EMAIL_USER,  // Your email
      pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
  });

  // Setup the email content
  const mailOptions = {
    from: process.env.EMAIL_USER,  // Sender email
    to: 'colocadoandrewed@gmail.com',  // Recipient email
    subject: 'New Contact Form Submission',  // Email subject
    text: `You have received a new message from the contact form:

    Name: ${name}
    Email: ${email}
    Message: ${message}`,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: info.messageId }),
    };
  } catch (error) {
    // Handle error
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};