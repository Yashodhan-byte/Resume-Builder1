const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/reset-password', (req, res) => {
    const { email } = req.body;

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password', // Your email password or app password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: 'Click the link to reset your password: [link]', // Add your reset link here
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('Reset link sent');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});