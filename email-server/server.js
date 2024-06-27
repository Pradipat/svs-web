const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 54321;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    const transporter = nodemailer.createTransport({
        host: "email-smtp.ap-southeast-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: {
            user: "AKIAWCMOY7UGLCZUM5LJ",
            pass: "BH9Lcy+CJYpaeNLY5GriHnLZvK7Ht6UC1c7XeoNCJbX1",
        },
    });

    try {
        let info = await transporter.sendMail({
            from: email,
            to: "info@siamvayupak.com",
            subject: "Hello ✔",
            html: `<b>Hello ${name}</b> \n contract: ${phone} \n message: ${message}`,
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
