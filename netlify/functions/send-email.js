const nodemailer = require('nodemailer');
require('dotenv').config();

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Only POST requests are allowed' }),
    };
  }

  try {
    // Parse the form data from the request body
    const { name, email, message } = JSON.parse(event.body);

    // Check if all required fields are present
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Log the incoming data to check the values
    console.log("Received form data:", { name, email, message });

    // Create a transporter using Gmail (or another service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Your email
        pass: process.env.EMAIL_PASS,  // Your email password or app password
      },
    });

    // Setup the email content
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender address
      to: 'colocadoandrewed@gmail.com',  // Recipient address
      subject: 'New Form Submission',  // Email subject
      text: `You have received a new message from the website form:

      Name: ${name}
      Email: ${email}
      Message: ${message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: info.messageId }),
    };
  } catch (error) {
    console.error('Error in send-email function:', error); // Log error for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};