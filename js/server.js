const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.post('/send-email', (req, res) => {
  const { Name, Company, Email, Phone, Message } = req.body;

  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com', // Replace with your email address
      pass: 'your-password' // Replace with your email password
    }
  });

  // Email message options
  const mailOptions = {
    from: `${Name} <${Email}>`,
    to: 'your-email@gmail.com', // Replace with your email address
    subject: 'New Contact Form Submission',
    text: `Name: ${Name}\nCompany: ${Company}\nEmail: ${Email}\nPhone: ${Phone}\nMessage: ${Message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error: Unable to send email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
